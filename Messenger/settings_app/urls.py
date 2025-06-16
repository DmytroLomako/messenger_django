from django.urls import path
from .views import *

urlpatterns = [
    path('save_photo', save_user_photo, name="save_photo"),
    path("save_sign", save_user_sign, name="save_sign"),
    path('albums', AlbumsView.as_view(), name='albums'),
    path('save_album', save_album, name='save_album'),
    path('save_album_photo/<int:album_id>', save_album_photo, name='save_album_photo'),
    path('delete_album/<int:album_id>', delete_album, name='delete_album'),
]