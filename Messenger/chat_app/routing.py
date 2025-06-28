'''
Файл для створення шляхів до сторінок по веб-сокет з'єднанню
'''
from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path("chats/chat/<int:group_pk>/", ChatConsumer.as_asgi())
]

