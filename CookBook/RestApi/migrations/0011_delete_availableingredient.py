# Generated by Django 3.0.5 on 2021-05-28 11:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('RestApi', '0010_dish'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AvailableIngredient',
        ),
    ]