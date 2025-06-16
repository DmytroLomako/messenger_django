from django.shortcuts import redirect
from django.contrib.auth import login
from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
from .forms import UserUpdateForm
from django.views.generic import ListView
from authorization.models import UserProfile
from django.contrib import messages
from .models import *
from django.http import JsonResponse

# Create your views here.


class UserUpdateView(UpdateView):
    model = User
    form_class = UserUpdateForm
    template_name = "settings.html"
    # success_url = "/settings/"
    
    def get_success_url(self):
        return f"/settings/{self.object.pk}"
    
    def form_valid(self, form):
        user = form.save()
        new_password = form.cleaned_data.get('new_password')
        if new_password:
            user.set_password(new_password)
            user.save()
            login(self.request, user)
        return redirect(self.get_success_url())
    
    def dispatch(self, request, pk,*args, **kwargs):
        print(request.user)
        if request.user.username:
            if request.user.id == pk:
                return super().dispatch(request, *args, **kwargs)
            else:
                return redirect(f"/settings/{request.user.id}")
        else:
            return redirect("login")

def save_user_photo(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            photo = request.FILES.get('photo')
            print(request.FILES)
            if photo:
                print(2)
                profile.photo = photo
                profile.save()
            return redirect('settings', pk=request.user.pk)
def save_user_sign(request):
    if request.method == 'POST' and 'sign' in request.FILES:
        file = request.FILES['sign']
        # Сохраняем файл    
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        profile.sign = file
        profile.save()
        print(file)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
def save_username(request, username):
    if request.method == "POST":
        if request.user.is_authenticated:
            user= User.objects.get(id=request.user.id)
            print(username)
            user.username = username

            user.save()
            return redirect('settings', pk=request.user.pk)
        
class AlbumsView(ListView):
    # model = Album
    model = User
    template_name = "albums.html"
    context_object_name = "albums"
    
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            print(request.POST, request.POST.get('album_id'))
            self.object_list = self.get_queryset()
            album = Album.objects.get(id=int(request.POST.get('album_id')))
            if album:
                context = self.get_context_data(**kwargs)
                context['album'] = album
                return self.render_to_response(context)
    
    def get_context_data(self, **kwargs):
        all_tags = Tag.objects.all()
        context = super().get_context_data(**kwargs)
        context['all_tags'] = all_tags
        print(not self.request.user.profile.album_set.all())
        return context

def save_album(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            user = request.user.profile
            name = request.POST.get('name')
            topic = request.POST.get('theme').replace('"', '')
            topic = Tag.objects.get(name=topic)
            date = request.POST.get('year')
            if request.POST.get('edit'):
                album = Album.objects.get(id=request.POST.get('edit'))
                album.name = name
                album.topic = topic
                album.save()
                return redirect('albums')
            else:
                Album.objects.create(author=user, name=name, topic=topic)
            return redirect('albums')
        
def save_album_photo(request, album_id):
    if request.method == 'POST':
        if request.user.is_authenticated:
            album = Album.objects.get(id=album_id)
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            if album.author == profile:
                album_images = request.FILES.getlist('album_images')
                if album_images:
                    for image in album_images:
                        album.images.create(file=image, filename=image.name)
                return JsonResponse({'status': 'success'})
    return redirect('albums')

def delete_album(request, album_id):
    if request.method == "POST":
        if request.user.is_authenticated:
            album = Album.objects.get(id=album_id)
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            if album.author == profile:
                album.delete()
        return redirect('albums')
    
def delete_album_photo(request, album_id, image_id):
    if request.method == "POST":
        if request.user.is_authenticated:
            album = Album.objects.get(id=album_id)
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            if album.author == profile:
                image = album.images.get(id=image_id)
                image.delete()
            return JsonResponse({'status': 'success'})
        return redirect('albums')