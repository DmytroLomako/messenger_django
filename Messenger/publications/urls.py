from django.urls import path
from .views import *

urlpatterns = [
    path('my_publications/', MyPublicationsView.as_view(), name='my_publications')
]