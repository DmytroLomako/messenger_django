from django.shortcuts import redirect
from django.contrib.auth import login
from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
from .forms import UserUpdateForm
from django.views.generic import ListView
from authorization.models import Profile, Avatar
from django.contrib import messages
from .models import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from authorization.models import VerificationCode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
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
        if not request.user.is_authenticated:
            return redirect("register")
        print(request.user)
        if request.user.username:
            if request.user.id == pk:
                return super().dispatch(request, *args, **kwargs)
            else:
                return redirect(f"/settings/{request.user.id}")
        else:
            return redirect("login")
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['user_image'] = Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image
            print(Avatar.objects.filter(profile = Profile.objects.get(user = self.request.user)).last().image)
        except:
            context['user_image'] = None
        
        return  context

def save_user_photo(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            # profile, created = Profile.objects.get_or_create(user=request.user)
            photo = request.FILES.get('photo')
            print(request.FILES)
            if photo:
                avatar = Avatar.objects.create(image = photo, profile = Profile.objects.get(user = request.user))
                avatar.save()
            return redirect('settings', pk=request.user.pk)
        

def save_user_sign(request):
    if request.method == 'POST' and 'sign' in request.FILES:
        file = request.FILES['sign']
        # Сохраняем файл    
        profile, created = Profile.objects.get_or_create(user=request.user)

        profile.signature = file
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
            profile, created = Profile.objects.get_or_create(user=request.user)
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
            profile, created = Profile.objects.get_or_create(user=request.user)
            if album.author == profile:
                album.delete()
        return redirect('albums')
    
def delete_album_photo(request, album_id, image_id):
    if request.method == "POST":
        if request.user.is_authenticated:
            album = Album.objects.get(id=album_id)
            profile, created = Profile.objects.get_or_create(user=request.user)
            if album.author == profile:
                image = album.images.get(id=image_id)
                image.delete()
            return JsonResponse({'status': 'success'})
        return redirect('albums')
    

def save_password(request):
    if request.method == "POST" and request.POST.get("password1") != "":
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        print(password1)
        print(password2)
        print(request.POST)
        if password1 == password2:
            user = User.objects.get(id = request.user.id)
            user.password = make_password(password1)
            user.save()
        return redirect('settings', pk=request.user.pk)
    else:
        return redirect("settings", pk=request.user.pk)


def save_email_password_verify(request):
    code = f"{request.POST.get('verification_code1')}{request.POST.get('verification_code2')}{request.POST.get('verification_code3')}{request.POST.get('verification_code4')}{request.POST.get('verification_code5')}{request.POST.get('verification_code6')}"

    user = User.objects.get(pk=request.user.id)
            
    verification = VerificationCode.objects.get(username=f"{user.email}")
    
    if verification.code == code and verification.is_valid():
        user.is_active = True
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        print(password1)
        print(password2)
        print(request.POST)
        user = User.objects.get(id = request.user.id)
        user.password = make_password(password1)
        user.save()
        verification.delete()
        
        if 'verification_user_id' in request.session:
            del request.session['verification_user_id']

    return redirect("settings", request.user.pk)


def send_email_password_verify(request):
    verification_code = VerificationCode.generate_code()
    VerificationCode.objects.create(username=f"{request.user.email}", code=verification_code)
    
    mail_subject = 'Підтвердіть зміненя паролю'
    message = render_to_string('authorization/email/account_activation_email.html', {
        'user': request.user,
        'code': verification_code,
    })
    to_email = request.user.email
    email = EmailMessage(
        mail_subject, message, to=[to_email]
    )
    email.send()
    return redirect("settings", request.user.pk)