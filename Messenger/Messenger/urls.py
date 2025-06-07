"""
URL configuration for Messenger project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from main.views import MainView
from create_tag.views import CreateTagView
from publications.views import MyPublicationsView
from settings_app.views import UserUpdateView
from friends.views import FriendsView
from chats.views import ChatsView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('authorization/', include("authorization.urls")),
    path('', MainView.as_view(), name= "main"),
    path("create_tag/", CreateTagView.as_view(), name= "create_tag"),
    path("friends/", FriendsView.as_view(), name= "friends"),
    path("publications/", include("publications.urls")),
    path("settings/<int:pk>/", UserUpdateView.as_view(), name="settings"),
    path("settings/", include("settings_app.urls")),
    path("", include("main.urls")),
    path("chats/", ChatsView.as_view(), name= "chats")
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

