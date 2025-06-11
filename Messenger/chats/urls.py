from django.urls import path
from .views import *

urlpatterns = [
    path('chat/<int:group_pk>/', ChatView.as_view(), name='chat')
]
