from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random

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