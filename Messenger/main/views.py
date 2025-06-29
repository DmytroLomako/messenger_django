from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from post_app.models import Post, Image, Tag
from django.views.generic import CreateView
from post_app.forms import CreatePostForm
from django.urls import reverse_lazy
from user_app.models import Profile, Avatar, Friendship
from django.contrib.auth.models import User
from chat_app.models import ChatMessage, ChatGroup
from django.http import JsonResponse
from django.core import serializers

# Create your views here.

class MainView(CreateView):
    template_name = "main/main.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('main')
    
    def form_valid(self, form):
        form.instance.author =  Profile.objects.get(user = self.request.user)
        post = form.save()

        print(post)

        # if len(form.images) >= 6:
        #     return redirect(reverse_lazy("my_publications"))

        files = self.request.FILES.getlist('images')    


        post_images = []
        for file in files:
            image = Image.objects.create(filename = str(file).split("/")[-1], file=file)
            image.save()

            post_images.append(image)

        post.images.set(post_images)

        post.save()
        print(post)
        return super().form_valid(form)
    

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = list(reversed(Post.objects.all()))[:5]
        user_profile_now = Profile.objects.get(user_id = self.request.user.id)  

        # context["profile_now"] = user_profile_now
        
        context["requests"]  = Friendship.objects.filter(profile2 = user_profile_now, accepted = False)
        
        context['groups']= ChatGroup.objects.filter(members = user_profile_now)
        

        return context
    
    def dispatch(self, request, *args, **kwargs):
        if len(Tag.objects.all()) == 0:
            standart_tags_list = ["#відпочинок", "#натхнення", "#життя", "#природа", "#читання", "#спокій", "#гармонія", "#музика", "#фільми", "#подорожі"]
            for tag in standart_tags_list:
                Tag.objects.create(name = tag)
        try:
            if request.user.email:
                return super().dispatch(request, *args, **kwargs)
            else:
                return redirect("login")
        except:
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
    


def get_user_readers(request):
    user_profile_now = Profile.objects.get(user_id = request.user.id)  
    all_user_posts = Post.objects.filter(author = user_profile_now)

    views_count = 0
    for post in all_user_posts:
        views_count += len(post.views.all())


    return JsonResponse({"status": "success", "views_count":views_count})


def get_user_photo(request):
    user_profile_now = Profile.objects.get(user_id = request.user.id) 
    if user_profile_now.avatar_set.last() != None:              
        return JsonResponse({"status": "success", "photo":user_profile_now.avatar_set.last().image.url})
    else:
        return JsonResponse({"status": "success", "photo":"/static/images/standart_user_image.png"})


def get_user_groups(request):
    user_profile_now = Profile.objects.get(user_id = request.user.id)  
    return JsonResponse({"groups": ChatGroup.objects.filter(members = user_profile_now)})


def get_user_requests(request):
    user_profile_now = Profile.objects.get(user = request.user)  
    friendship = Friendship.objects.filter(profile2 = user_profile_now, accepted = False)
    print(friendship)
    return JsonResponse(
        {"groups": serializers.serialize("json", friendship),
        "first_name": friendship.profile1.user.username
         },
        )