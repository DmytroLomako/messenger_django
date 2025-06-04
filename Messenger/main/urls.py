from django.urls import path
from .views import *

urlpatterns = [
    path("add_info", create_name_surname, name = "add_info")
]