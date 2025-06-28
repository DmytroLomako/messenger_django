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
from settings_app.views import UserUpdateView
from chat_app.views import ChatsView
from settings_app.views import save_username
from post_app.views import show_post

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authorization/', include("user_app.urls")),
    path('', MainView.as_view(), name= "main"),
    path("friends/", include("friends.urls")),
    path("publications/", include("post_app.urls")),
    path("settings/<int:pk>/", UserUpdateView.as_view(), name="settings"),
    path("settings/", include("settings_app.urls")),
    path("", include("main.urls")),
    path("chats/", ChatsView.as_view(), name= "chats"),
    path("chats/", include("chat_app.urls")),
    path("save_username/<str:username>/", save_username, name= "save_username"),
    path("show_post/<int:post_pk>/", show_post, name = "show_post")
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

