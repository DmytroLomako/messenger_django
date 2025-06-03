from django.views.generic import CreateView
from .models import User_Post, Images
from django.urls import reverse_lazy
from django.shortcuts import redirect, render
from .forms import CreatePostForm
from django.http import JsonResponse
from django.core import serializers
from authorization.models import UserProfile
import json


class MyPublicationsView(CreateView):
    template_name = "publications/my_publications.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('my_publications')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        post = form.save()

        # if len(form.images) >= 6:
        #     return redirect(reverse_lazy("my_publications"))

        files = self.request.FILES.getlist('images')    


        for file in files:
            Images.objects.create(post=post, image=file)
        post.save()
        print(",kmegewoirko")
        return super().form_valid(form)
        

    def post(self, request, *args, **kwargs):
        if request.POST.get("create") == None:    
            post_now = User_Post.objects.get(id = int(request.POST.get("post_id")))
            post_now.title = request.POST.get("title")
            post_now.subject = request.POST.get("subject")
            post_now.text = request.POST.get("text")
            post_now.article_link = request.POST.get("link")
            print(request.POST.get("tags-list").split(","))
            post_now.tags.set(request.POST.get("tags-list").split(","))
            post_now.save()
        return super().post(request, *args, **kwargs)

    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = User_Post.objects.all()
        context['user_image'] = UserProfile.objects.get(user_id = (self.request.user.id)).photo
        return context

    def dispatch(self, request, *args, **kwargs):
        print(request.user)
        if request.user.username:
            return super().dispatch(request, *args, **kwargs)
        else:
            return redirect("login")
    
def delete(request, post_pk):
    try:
        if request.method == "POST":
            object = User_Post.objects.get(id=post_pk)
            object.delete()

        return JsonResponse({'status': 'success'})
    except:
        return JsonResponse({'status': 'error'})

    
    
def likes(request, post_pk):
    try:
        if request.method == 'POST':
            post = User_Post.objects.get(id=post_pk)
            if request.user not in post.likes.all():
                post.likes.add(request.user)
            else:
                post.likes.remove(request.user)
            return JsonResponse({'status': 'success'})
    except:
        return JsonResponse({'status': 'error'})

def redact_data(request, post_pk):
    if request.method == 'POST':
        post = [User_Post.objects.get(id = post_pk)]
        return JsonResponse(serializers.serialize("json", post), safe=False)
