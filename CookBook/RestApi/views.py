from enum import unique
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.forms.models import model_to_dict
import json
import itertools

import json
from RestApi.models import *

def review(request, *args, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())
            result = list(Review.objects.filter(**queryParams).values())
            return JsonResponse({
                "data": result,
                "error": 0
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)
    if request.method == 'POST':  
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode) 
            toSend = Review(**body['data'])
            toSend.save()
            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)

def post(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())
            result = list(Post.objects.filter(**queryParams).values())
            print(result)
            return JsonResponse({
                "data": result,
                "error": 0
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            toSend = Post(**body['data'])
            toSend.save()
            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)


def availableIngredient(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            data = list(Dish.objects.filter().values())
            result = list(map(lambda x: list(map(lambda y: y['name'], x['Ingredients'])), data))
            result = list(itertools.chain(*result))
            result = list(set(result))
            print(result)

            #result = list(AvailableIngredient.objects.filter(**queryParams).values())
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)

def dishOfType(request, *arg, **krwargs):
    if request.method == "GET":
        try:
            data = list(Dish.objects.filter().values())
            data = populateReviews(data)
            queryParams = dict(request.GET.items())
            print(queryParams['types'])
            if 'types' not in queryParams or queryParams['types'] == '':
                return JsonResponse({
                    "data": data
                })
            
            lookingForTypes = queryParams['types'].split(',') #lista szukanych typów

            result = []
            for d in data:
                types = list(map(lambda x: x['name'], d['types']))
                if set(lookingForTypes).issubset(set(types)):
                    result.append(d)
            
            #result = [dishes for dishes in data if all(x in list(map(lambda x: x['name'],dishes['types'])) for x in lookingForTypes)]
            
            print(result)
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)

def dish(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())    
            result = list(Dish.objects.filter(**queryParams).values())
            result = populateReviews(result)
            
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)
            
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            reviewsLen = len(body['data']['reviews'])
            tempList = []

            for i in range(reviewsLen):
                tempReview = Review(**body['data']['reviews'][i])
                tempReview.save()
                tempList.append(tempReview)
            
            
            body['data'].pop('reviews')
            toSend = Dish(**body['data'])
            toSend.save()
            for review in tempList:
                toSend.reviews.add(review)

            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)

def availableTypes(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            data = list(Dish.objects.filter().values())
            result = list(map(lambda x: list(map(lambda y: y['name'], x['types'])), data))
            result = list(itertools.chain(*result))
            result = list(set(result))

            return JsonResponse({
                "data": result
            })
        except Exception as e:
            print(e)
            return JsonResponse({
                "error": str(e)
            }, status=401)




def populateReviews(data):
    result = data
    for index, res in enumerate(result):
        resultArray = []
        for val in res['reviews_id']:
            try:
                tempDict = model_to_dict(Review.objects.get(id = val))
                resultArray.append(tempDict)
            except Exception as e:
                print("Error, id exists as foreign key, but not in the actual collection, ", e)
        result[index].pop('reviews_id')
        result[index]['reviews'] = resultArray
    return result