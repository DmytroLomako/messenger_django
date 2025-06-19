from django.urls import path
from .views import *

urlpatterns = [
    path('my_publications/', MyPublicationsView.as_view(), name='my_publications'),
    path('likes/<int:post_pk>/', likes, name='likes'),
    path('delete/<int:post_pk>/', delete, name="delete"),
    path('redact/<int:post_pk>/', redact_data, name="redact"),
    path("create_tag/", save_tag, name = "save_tag"),
    path("view_post/<int:post_pk>/", view_post, name = "view_post")
]