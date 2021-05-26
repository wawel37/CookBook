from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.forms.models import model_to_dict
import json

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
            return JsonResponse({
                "error": str(e)
            })
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
            return JsonResponse({
                "error": str(e)
            })

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
            return JsonResponse({
                "error": str(e)
            })
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
            return JsonResponse({
                "error": str(e)
            })


def availableIngredient(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())
            result = list(AvailableIngredient.objects.filter(**queryParams).values())
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            toSend = AvailableIngredient(**body['data'])
            toSend.save()
            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })

def recipe(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())
            result = list(Recipe.objects.filter(**queryParams).values())
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })
            
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            toSend = Recipe(**body['data'])
            
            toSend.save()
            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })

def dish(request, *arg, **kwargs):
    if request.method == 'GET':
        try:
            queryParams = dict(request.GET.items())    
            result = list(Dish.objects.filter(**queryParams).values())
            for index, res in enumerate(result):
                resultArray = []
                for val in res['reviews_id']:
                    try:
                        tempDict = model_to_dict(Review.objects.get(id = val))
                        resultArray.append(tempDict)
                    except Exception as e:
                        print("Error, id exists as foreign key, but not in the actual collection")
                result[index].pop('reviews_id')
                result[index]['reviews'] = resultArray

            
            return JsonResponse({
                "data": result
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            reviewsLen = len(body['data']['reviews'])
            tempList = []
            # dupa = list(Dish.objects.filter().values())
            # print(dupa)
            # for e in dupa:
            #     print(e['reviews_id'])

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
            print("test")
            return JsonResponse({
                "error": str(e)
            })

