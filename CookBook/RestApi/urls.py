from django.urls import path
from . import views

urlpatterns = [
    path('review/', views.review, name='review'),
    path('post/', views.post, name='post'),
    path('availableIngredient/', views.availableIngredient, name='ingredient'),
    path('recipe/', views.recipe, name='recipe'),
    path('dish/', views.dish, name='dish')
]