from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class ChatGroup(models.Model):
    name = models.CharField(max_length = 255)
    users = models.ManyToManyField(User, related_name= "group")
    avatar_group = models.ImageField(upload_to= "groups_avatars/", default= "groups_avatars/default.png")
    personal_chat = models.BooleanField(default = False)

class ChatMessage(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "author")
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    views = models.ManyToManyField(User, related_name='viewed_messages')