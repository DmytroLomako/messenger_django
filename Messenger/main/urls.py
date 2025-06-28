from django.urls import path
from .views import *

urlpatterns = [
    path("add_info", create_name_surname, name = "add_info"),
    path("get_user_readers", get_user_readers, name = "get_user_readers"),
    path("get_user_photo", get_user_photo, name = "get_user_photo"),
    path("get_user_groups", get_user_photo, name = "get_user_groups"),
    path('get_user_requests', get_user_requests, name = "get_user_requests")
]