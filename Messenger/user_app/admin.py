from django.contrib import admin
from .models import *
from .models import VerificationCode, Profile

# Register your models here.

# Register your models here.
admin.site.register([Profile, Friendship, Avatar, VerificationCode])

