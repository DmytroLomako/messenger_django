from django.shortcuts import render
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required

# Create your views here.


@login_required(login_url= "/authorization/login/")
def render_main(request: HttpRequest):

    return render(request, "main/main.html")