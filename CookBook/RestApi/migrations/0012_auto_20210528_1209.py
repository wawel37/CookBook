# Generated by Django 3.0.5 on 2021-05-28 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('RestApi', '0011_delete_availableingredient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dish',
            name='reviews',
        ),
        migrations.DeleteModel(
            name='Recipe',
        ),
        migrations.DeleteModel(
            name='Dish',
        ),
    ]
