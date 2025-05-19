from django.shortcuts import render
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from publications.models import User_Post
from django.views.generic import CreateView
from publications.forms import CreatePostForm
from django.urls import reverse_lazy
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
        return context