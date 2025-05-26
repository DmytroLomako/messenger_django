from django.views.generic import CreateView
from .models import User_Post, Images
from django.urls import reverse_lazy
from django.shortcuts import redirect, render
from .forms import CreatePostForm
from django.http import JsonResponse

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
        if self.request.POST.get("post") == None:
            pass

        for file in files:
            Images.objects.create(post=post, image=file)
        post.save()
        return super().form_valid(form)
    
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = User_Post.objects.all()
        return context

    
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
        post = User_Post.objects.get(id = post_pk)
        return JsonResponse({"post": post})
    