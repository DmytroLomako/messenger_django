from django.urls import path
from .views import *

urlpatterns = [
    path('save_photo', save_user_photo, name="save_photo"),
    path("save_sign", save_user_sign, name="save_sign"),
    path('albums', AlbumsView.as_view(), name='albums'),
    path('save_album', save_album, name='save_album'),
    path('save_album_photo/<int:album_id>', save_album_photo, name='save_album_photo'),
    path('delete_album/<int:album_id>', delete_album, name='delete_album'),
    path('delete_photo/<int:album_id>/<int:image_id>', delete_album_photo, name='delete_photo'),
    path("save_password", save_password, name= "save_password"),
    path("save_email_password_verify", save_email_password_verify, name= "save_email_password_verify"),
    path("send_email_password_verify", send_email_password_verify, name = "send_email_password_verify")
]