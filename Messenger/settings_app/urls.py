from django.urls import path
from .views import *

urlpatterns = [
    path('save_photo', save_user_photo, name="save_photo")
]