from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from publications.models import Post, Image, Tag
from django.views.generic import CreateView
from publications.forms import CreatePostForm
from django.urls import reverse_lazy
from authorization.models import Profile, Avatar, Friendship
from django.contrib.auth.models import User
from chats.models import ChatMessage

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
        context['all_posts'] = reversed(Post.objects.all())
        print(context['all_posts'], "\n\n\n\n\n\n\n\n\n\n")
        try:
            context['user_image'] = Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image
            print(Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image)
        except:
            context['user_image'] = None

        user_object = User.objects.get(username = self.request.user)                                                                                                                             
        user_profile_now = Profile.objects.get(user_id = self.request.user.id)  
        context["profile_now"] = Profile.objects.get(user = self.request.user)

        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = self.request.user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        return context
    
    def dispatch(self, request, *args, **kwargs):
        print(request.user)
        if not request.user.is_authenticated:
            return redirect("register")
        if len(Tag.objects.all()) == 0:
            standart_tags_list = ["#відпочинок", "#натхнення", "#життя", "#природа", "#читання", "#спокій", "#гармонія", "#музика", "#фільми", "#подорожі"]
            for tag in standart_tags_list:
                Tag.objects.create(name = tag)
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