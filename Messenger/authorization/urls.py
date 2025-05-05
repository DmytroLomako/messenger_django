from django.contrib import admin
from django.urls import path
from .views import render_login, render_registration


urlpatterns = [
    path('login/', render_login, name= "login"),
    path('registration/', render_registration, name= "reg")
]
