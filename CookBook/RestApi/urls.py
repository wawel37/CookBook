from django.urls import path
from . import views

urlpatterns = [
    path('review/', views.review, name='review'),
    path('post/', views.post, name='post'),
    path('ingredient/', views.availableIngredient, name='ingredient'),
    path('dish/', views.dish, name='dish'),
    path('dish_of_type/', views.dishOfType, name='dish_of_type'),
    path('types/', views.availableTypes, name='types')
]