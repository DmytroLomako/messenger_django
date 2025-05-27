from django.shortcuts import render

# Create your views here.

from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
from .forms import UserUpdateForm


class UserUpdateView(UpdateView):
    model = User
    form_class = UserUpdateForm
    template_name = "settings.html"
    # success_url = "/settings/"
    
    def get_success_url(self):
        return f"/settings/{self.request.user.id}"