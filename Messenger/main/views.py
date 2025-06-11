from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from publications.models import User_Post
from django.views.generic import CreateView
from publications.forms import CreatePostForm
from django.urls import reverse_lazy
from authorization.models import UserProfile
from django.contrib.auth.models import User
# Create your views here.

class MainView(CreateView):
    template_name = "main/main.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('main')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        post = form.save()
        post.save()
        return super().form_valid(form)
    
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = User_Post.objects.all()
        print(context['all_posts'], "\n\n\n\n\n\n\n\n\n\n")
        context['user_image'] = UserProfile.objects.get(user_id = (self.request.user.id)).photo
        return context
    
    def dispatch(self, request, *args, **kwargs):
        print(request.user)
        if request.user.email:
            return super().dispatch(request, *args, **kwargs)
        else:
            return redirect("login")
        
def create_name_surname(request):
    if request.method == "POST":
        name = request.POST.get("name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")

        if "@" in username:
          username = username.split("@")[-1]

        user_now = User.objects.get(id = request.user.id)

        user_now.first_name = name
        user_now.last_name = last_name
        user_now.username = username

        user_now.save()

        print(name, "\n", last_name, "\n", username, "\n")


        
        return redirect("main")