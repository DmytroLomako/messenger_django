from django.urls import path
from .views import *

urlpatterns = [
    path('my_publications/', MyPublicationsView.as_view(), name='my_publications'),
    path('likes/<int:post_pk>/', likes, name='likes'),
    path('delete/<int:post_pk>/', delete, name="delete")
]