from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import HttpRequest
from .forms import RegistrationForm, LoginForm
# Create your views here.


def render_login(request: HttpRequest):
        
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            login(request, user)
    return render(request, 'authorization/login/login.html', context = {"form": form})



def render_registration(request: HttpRequest):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            return redirect("login")
    return render(request, 'authorization/registration/registration.html', context={'form': form})