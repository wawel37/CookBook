from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

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
            toSend = Dish(**body['data'])
            toSend.save()
            return JsonResponse({
                "data": body['data'],
                "error": 0
            })
        except Exception as e:
            return JsonResponse({
                "error": str(e)
            })

