from django.views.generic import CreateView
from .models import Post, Image, Link
from django.urls import reverse_lazy
from django.shortcuts import redirect, render
from .forms import CreatePostForm
from django.http import JsonResponse
from django.core import serializers
from user_app.models import Profile, Avatar, Friendship
from post_app.models import Tag
from django.core import serializers
import json


class MyPublicationsView(CreateView):
    template_name = "publications/my_publications.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('my_publications')
    
    def form_valid(self, form):
        form.instance.author =  Profile.objects.get(user = self.request.user)
        if self.request.POST.get("create"):
            print(self.request.POST.get("create"))
            post = form.save()

            print(post)

            # if len(form.images) >= 6:
            #     return redirect(reverse_lazy("my_publications"))

            files = self.request.FILES.getlist('images')    

            print(self.request.FILES)
            post_images = []
            for file in files:
                image = Image.objects.create(filename = str(file).split("/")[-1], file=file)
                image.save()

                post_images.append(image)

            post.images.set(post_images)
            
            links = self.request.POST.getlist("links")
            for link in links:
                link = Link.objects.create(url=link, post=post)

            post.save()
            print(post)
        return super().form_valid(form)
        
    def form_invalid(self, form):
        post = form

        print(post)
        return super().form_invalid(form)


    def post(self, request, *args, **kwargs):
        if request.POST.get("create") == None:
            # Редактирование
            post_now = Post.objects.get(id=int(request.POST.get("post_id")))
            post_now.title = request.POST.get("title")
            post_now.content = request.POST.get("content")
            
            links = request.POST.getlist("links")
            Link.objects.filter(post = post_now).delete()
            for link in links:
                link = Link.objects.create(url=link, post=post_now)
            
            final_list_tags = []
            for element in request.POST.get("tags-list").split("_"):
                print(element)
                if element != '':
                    final_list_tags.append(int(element))
            print(final_list_tags)
            post_now.tags.set(final_list_tags)
            post_now.images.all().delete()
            if request.FILES:
                files = request.FILES.getlist('images')
                for file in files:
                    img = Image.objects.create(filename=file.name, file=file)
                    post_now.images.add(img)
            post_now.save()
            return redirect(self.success_url)  # Не вызываем super().post()
        else:
            # Создание (вызов родительского метода)
            return super().post(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)  
        context['all_posts'] = reversed(Post.objects.all())
        try:
            context['user_image'] = Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image
            print(Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image)
        except:
            context['user_image'] = None

        views_count = 0

        user = self.request.user
        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        user_profile_now = Profile.objects.get(user = self.request.user)
        all_user_posts = Post.objects.filter(author = user_profile_now)
        for post in all_user_posts:
            views_count += len(post.views.all())
        context["readers"] = views_count

        context["all_readers"] = user_profile_now.post_set.all()

        context["profile_now"] = Profile.objects.get(user = self.request.user)
        return context

    def dispatch(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return redirect("register")
        except:
            return redirect("register")
        return super().dispatch(request, *args, **kwargs)
    
def delete(request, post_pk):
    try:
        if request.method == "POST":
            object = Post.objects.get(id=post_pk)
            object.delete()
        print(post_pk, "ewgbmobbfenr")
        return JsonResponse({'status': 'success'})
    except:
        print(post_pk)
        return JsonResponse({'status': 'error'})

    
    
def likes(request, post_pk):
    try:
        if request.method == 'POST':
            profile_now = Profile.objects.get(user = request.user)
            post = Post.objects.get(id=post_pk)
            if profile_now not in post.likes.all():
                post.likes.add(profile_now)
            else:
                post.likes.remove(profile_now)
            return JsonResponse({'status': 'success'})
    except:
        return JsonResponse({'status': 'error'})

def redact_data(request, post_pk):
    if request.method == 'POST':
        post = [Post.objects.get(id = post_pk)]
        links = list(post[0].link_set.all())
        images = post[0].images.all()
        for image in images:
            post.append(image)
        return JsonResponse({'post': serializers.serialize("json", post), 'links': serializers.serialize("json", links)}, safe=False)


def save_tag(request):
    tags_text = request.POST.get("list_tags")
    print(tags_text)
    print(request.POST)
    if request.method == "POST":
        post = Tag.objects.create(name = tags_text)
        post.save()
        if request.POST.get("page-to-return")  == "publications":
            return redirect("my_publications")
        


def view_post(request, post_pk):
    post = Post.objects.get(id = post_pk)
    post.views.add(Profile.objects.get(user= request.user))

    post.save()

    return JsonResponse({"status": "success"})


def get_all_tags(request):
    tags = Tag.objects.all().values('id', 'name')
    return JsonResponse(list(tags))


def show_post(request, post_pk):
    post=  Post.objects.get(id = post_pk )
    print(post.id)
    return JsonResponse({"post": serializers.serialize("json", [post])})