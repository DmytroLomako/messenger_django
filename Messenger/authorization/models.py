from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
import random

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name= "profile")
    birthday = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True, default="images/standart_user_image.png")
    sign = models.ImageField(upload_to= "profile_signs/", null=True, blank=True, default="images/standart_sign.png")
    requests = models.ManyToManyField(User, related_name="requests")
    friends = models.ManyToManyField(User, related_name="friends")


    def __str__(self):
        return f"{self.user.username}"



class VerificationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def generate_code(cls):
        return ''.join([str(random.randint(0, 9)) for i in range(6)])
    
    def is_valid(self):
        expiration_time = timezone.timedelta(minutes=30)
        return timezone.now() < self.created_at + expiration_time
    
