from django.urls import path
from .views import *

urlpatterns = [
    path('save_photo', save_user_photo, name="save_photo"),
    path("save_sign", save_user_sign, name="save_sign"),
    
]