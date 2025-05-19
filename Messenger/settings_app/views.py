from django.shortcuts import render

# Create your views here.

from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User


class UserUpdateView(UpdateView):
    model = User
    fields = ["username"]
    template_name = "settings.html"