from django.urls import path
from .views import *


urlpatterns = [
    path('', FriendsView.as_view(), name='friends'),
    path('requests', RequestsView.as_view(), name='requests'),
    path('recomendations', RecomendationsView.as_view(), name='recomendations'),
    path('allfriends', AllFriendsView.as_view(), name='all_friends'),
    path('request_friend/<int:pk>', request_friend, name='request_friend'),
    path('accept_friend/<int:pk>', accept_friend, name='accept_friend'),
    # path('reject_friend/<int:pk>', reject_friend, name='reject_friend'),
    path('delete_friend/<int:pk>', delete_friend, name='delete_friend'),
    path('friend_view/<int:friend_pk>', FriendView.as_view(), name='friend_view')
]