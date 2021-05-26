from djongo import models
from django import forms

class TextElement(models.Model):
    name = models.CharField(max_length=50)
    
    class Meta:
        abstract = True
    
class TextForm(forms.ModelForm):
    class Meta:
        model = TextElement
        fields = (
            'name',
        )

class Review(models.Model):
    text = models.CharField(max_length=1000)
    userName = models.CharField(max_length=50)
    rating = models.IntegerField()


class Dish(models.Model):
    name = models.CharField(max_length=40)
    author = models.CharField(max_length=40)
    types = models.ArrayField( 
        model_container=TextElement,
        model_form_class=TextForm
    )
    recipeID = models.IntegerField()
    reviews = models.ArrayReferenceField(
        to=Review,
        on_delete=models.CASCADE,
    )
    img = models.CharField(max_length=100)


class Ingredient(models.Model):
    name = models.CharField(max_length=500)
    amount = models.IntegerField()
    
    class Meta:
        abstract = True

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = (
            'name', 'amount'
        )

class Recipe(models.Model):
    description = models.CharField(max_length=1000)
    Ingredients = models.ArrayField(
        model_container=Ingredient,
        model_form_class=IngredientForm
    )
    

class AvailableIngredient(models.Model):
    name = models.CharField(max_length=40)
    unitType = models.CharField(max_length=20)

class Post(models.Model):
    text = models.CharField(max_length=1000)
    userName = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    img = models.CharField(max_length=100)
