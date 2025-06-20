from django.contrib import admin
from .models import VerificationCode, Profile

# Register your models here.
admin.site.register(VerificationCode)
admin.site.register(Profile)