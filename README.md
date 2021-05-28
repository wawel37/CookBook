# CookBook
Database course related project

Website built in React, Backend in Django + Djongo + MongoDB (Atlas used)

Endpoints:
* review/ -- for posting and acquiring reviews data from DB
* dish/ -- for posting and acquiring dishes data from DB
* dish_of_type/ -- for posting and acquiring dishes data of specific type from DB
* ingredient/ -- for posting and acquiring ingredients data from DB
* post/ -- for posting and acquiring user posts
* types/ -- for ingredient types

Models:
* Review 
* Dish
* Post
* Ingredient (abstract, embedded)
* TextElement (abstract, embedded)
