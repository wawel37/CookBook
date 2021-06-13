# CookBook

## Authors:   
<b>Mateusz Kowalski, Jakub Cichocki, Adrian Ryt</b>

Database course related project of a cooking recipe site, which lets users find, add and comment recipes which can be made from ingredients they have in their fridge. Website built in React, Backend in Django + Djongo + mongoDB, with Atlas used for mongoDB.

## How to run

First make sure you have python and npm/node installed and clone our repository.
Then you need to install requirements by typing this command in console.

    pip install -r requirements.txt

Next step is to go to the CookBook folder and start the server with this command:

    python manage.py runserver

After that go to the frontend folder and type this command:

    npm start

You should now be able to access the CookBook website at:

~~~
http://localhost:3000/
~~~

There you go! Our website should look similar to this:
![image](https://user-images.githubusercontent.com/72470330/121802259-b8c53200-cc3b-11eb-88e9-e4c81722940f.png)


## Database
Database used for recipes, posts and other data storage is mongoDB, in this case located on the Atlas service. The database consists of 3 data collections:

1. Review - containing all user reviews

    Example element of the Review collection:
    ~~~json
    {
	    "id": 1, 
	    "text": "Example post text", 
	    "userName": "Test User", 
	    "title": "Post Title", 
	    "img": "https://via.placeholder.com/350x150"
    }
    ~~~

2. Dish - containing every recipe, with its name, reviews, types ingredients and text of the recipe itself

    Example element of the Dish collection:
    ~~~json
    {
	    "id": 1, 
	    "name": "Test Dish", 
	    "author": "Test Author", 
	    "types": [
            {"name": "Test Type 1"}, 
            {"name": "Test Type 2"}
        ], 
	    "description": "Test dish description for example purposes", 
	    "Ingredients": [
	    	{
	    		"name": "egg", 
	    		"amount": "2 eggs"
	    	}, 
	    	{
	    		"name": "milk",
	    		"amount": "2 l."
	    	}
	    ], 
	    "img": "https://via.placeholder.com/350x150", 
	    "reviews": 
	    	[
                {
                "id": 74,
                "text": "Example review text",
                "userName": "userName",
                "rating": 5
                }
            ]
    }
    ~~~

    On the DB side there are also additional tables created by the Django ORM framework and Djongo, which are necessary for the API to function and deliver data to the frontend. 

3. Posts - containing every post made by users

    Example element of the Posts collection:

    ~~~json
    {
            "id": 1,
            "text": "Test text for Post element",
            "userName": "Test user",
            "title": "Test Title",
            "img": "https://via.placeholder.com/350x150"
    }
    ~~~
## Database schema

![image](https://user-images.githubusercontent.com/72470330/121803516-5885be80-cc42-11eb-9bcf-f446931e6f2e.png)




## API




Endpoints:
1. review/ -- for posting and acquiring reviews data from DB 
* Can use every model field as a query param, for example 
```
http://localhost:8000/api/review/?userName=blabla&rating=5
```
* When it comes to POST method it's really simple, just put the filled database model in your request's body

2. dish/ -- for posting and acquiring dishes data from DB
* Can use every model field as a query param excluding array and object fields, for example:
```
http://localhost:8000/api/dish?name=testDish&author=testAuthor
```
* When it comes to POST method it's really simple, just put the filled database model in your request's body
3. dish_of_type/ -- for posting and acquiring dishes data of specific type from DB
* Can access dishes with query param "types". Every single type is separeted by ",", for example:
```
http://localhost:8000/api/dish_of_type?types=testType1,testType3
```
4. ingredient/ -- for acquiring every available ingredient data from DB
* You don't need any query params, for example:
```
http://localhost:8000/api/ingredient
```
5. post/ -- for posting and acquiring user posts
* Can use every model field as a query param, for example
```
http://localhost:8000/api/post?title=tytul&userName=slazak
```
* When it comes to POST method it's really simple, just put the filled database model in your request's body
6. types/ -- for acquiring all available dish types
* You don't need any query params, for example:
```
http://localhost:8000/api/types
```
7. dish_with_ingredient/ -- for acquiring all dishes containing all ingredients in query set
* Can access dishes with query param "ingredients".  Every single ingredient is separated by ",", for example:
```
http://localhost:8000/api/dish_with_ingredient?ingredients=jajko,mleko
```

Every API request is handled by our Django based backend, and returns a JSON response which is structured like this:

~~~json
{
    data: []
    error: 0
}
~~~

To be able to map data acquired from the mongoDB database to object we use Django models.

Models used in our project:
* Review

~~~python
class Review(models.Model):
    text = models.CharField(max_length=1000)
    userName = models.CharField(max_length=50)
    rating = models.IntegerField()
~~~

* Dish

~~~python
class Dish(models.Model):
    name = models.CharField(max_length=40)
    author = models.CharField(max_length=40)
    types = models.ArrayField( 
        model_container=TextElement,
        model_form_class=TextForm
    )
    description = models.CharField(max_length=1000)
    Ingredients = models.ArrayField(
        model_container=Ingredient,
        model_form_class=IngredientForm
    )
    reviews = models.ArrayReferenceField(
        to=Review,
        on_delete=models.CASCADE,
    )
    img = models.CharField(max_length=100)
~~~

* Post

~~~python
class Post(models.Model):
    text = models.CharField(max_length=1000)
    userName = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    img = models.CharField(max_length=100)
~~~

* Ingredient and IngredientForm (abstract, embedded)

~~~python
class Ingredient(models.Model):
    name = models.CharField(max_length=500)
    amount = models.CharField(max_length=100)
    
    class Meta:
        abstract = True

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = (
            'name', 'amount'
        )
~~~

* TextElement and TextForm (abstract, embedded)

~~~python
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
~~~




Where error returns an error code signifying the success of failure of the request, and data returns an array of suitable objects to be parsed by frontend.

## Frontend
React components:   
* AddPost
* AddRecipe
* DishDetails
* Fridge
* NavBar
* Posts
* Recipes

Frontend is only for presentation purposes, our main goal in this project was to learn how to use mongoDB and set backend in Django.

