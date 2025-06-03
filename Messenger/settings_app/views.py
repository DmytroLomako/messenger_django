from django.shortcuts import redirect
from django.contrib.auth import login
from django.views.generic.edit import UpdateView
from django.contrib.auth.models import User
from .forms import UserUpdateForm
from authorization.models import UserProfile


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