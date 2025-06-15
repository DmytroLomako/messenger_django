from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from publications.models import Post, Image, Tag
from django.views.generic import CreateView
from publications.forms import CreatePostForm
from django.urls import reverse_lazy
from authorization.models import Profile, Avatar
from django.contrib.auth.models import User
from chats.models import ChatMessage

# Create your views here.

class MainView(CreateView):
    template_name = "main/main.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('main')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        post = form.save()
        files = self.request.FILES.getlist('images')    


        for file in files:
            Image.objects.create(post=post, image=file)
        post.save()
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
        messeges = ChatMessage.objects.all()
        not_viewed_messeges = []

        for message in messeges:

            if user_object not in message.views.all() and user_object in message.chat_group.users.all() and user_object != message.author:
                not_viewed_messeges.append(message)
        context["not_viewed_messeges"] = not_viewed_messeges

        return context
    
    def dispatch(self, request, *args, **kwargs):
        print(request.user)
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