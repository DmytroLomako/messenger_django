from django.db import models
from django.contrib.auth.models import User
from authorization.models import Profile
# Create your models here.


class ChatGroup(models.Model):
    name = models.CharField(max_length = 255)
    members = models.ManyToManyField(Profile, blank=True)
    is_personal_chat = models.BooleanField(default = False)
    admin = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name= "administered_group")
    avatar = models.ImageField(upload_to= "groups_avatars/", default= "groups_avatars/default.png")

    def __str__(self):
        return f'Група '

class ChatMessage(models.Model):
    content = models.TextField(max_length=4096)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)
    views = models.ManyToManyField(Profile, related_name='viewed_messages') 
    attached_image = models.ImageField(upload_to="image/messages", blank= True, null= True)

    def __str__(self):
        return f'Повідомлення від {self.author}. Відправлено {self.sent_at}'