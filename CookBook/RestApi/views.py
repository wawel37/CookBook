from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import json
from RestApi.models import *

def review(request, *args, **kwargs):
    if request.method == 'GET':
        print(Review.objects.all())
        return HttpResponse('test GET na review')
    if request.method == 'POST':
        toSend = Review(text="siema siemanko, gadam se z fanka", userName = "wykuriweci", rating=5)
        toSend.save()
        return HttpResponse('test GET na review')

def post(request, *arg, **kwargs):
    if request.method == 'GET':
        print(Post.objects.all())
        return HttpResponse('test GET na post')
    if request.method == 'POST':
        toSend = Post(img="testimg.com", text="test text for post", userName="slazak", title="tytul")
        toSend.save()
        return HttpResponse('test GET na post')

def availableIngredient(request, *arg, **kwargs):
    if request.method == 'GET':
        print(AvailableIngredient.objects.all())
        return HttpResponse('test GET na availableIngredient')
    if request.method == 'POST':
        toSend = AvailableIngredient(name = "jajko", unitType = "jajka")
        toSend.save()
        return HttpResponse('test POST na availableIngredient')

def recipe(request, *arg, **kwargs):
    if request.method == 'GET':
        print(Recipe.objects.all())
        return HttpResponse('test GET na Recipe')
    if request.method == 'POST':
        toSend = Recipe(description = "Pierwszy przepis", ingredients = [{"name": "Chlep","amount":100},{"name": "Maslo","amount":5}])
        toSend.save()
        return HttpResponse('test POST na Recipe')

def dish(request, *arg, **kwargs):
    if request.method == 'GET':
        print(Dish.objects.all())
        return HttpResponse('test GET na dish')
    if request.method == 'POST':
        toSend = Dish(
            name="test dish name", 
            author="test dish author", 
            types = [{"name": "obiad"}, {"name": "zupa"}],
            recipeID= 1, 
            reviews = [{"name":"Marek"}, {"name":"MeneleTV"}] , 
            img = "test.img" 
            )
        toSend.save()
        return HttpResponse('test POST na dish')

