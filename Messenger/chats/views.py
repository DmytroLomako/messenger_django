from django.views.generic import CreateView
from .models import ChatGroup
from django.shortcuts import render, redirect

class ChatsView(CreateView):
    template_name = "chats.html"
    model = ChatGroup
    fields = ["name", "users", "avatar_group"]

    def post(self, request, *args, **kwargs):
        group = ChatGroup.objects.create(
            name = request.POST.get("group_name"),
        )
        group.users.set([request.user.id])

        group.save()

        print(request.POST)
        return super().post(request, *args, **kwargs)
    

def save_group_photo(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            group, created = ChatGroup.objects.get_or_create(user=request.user)
            photo = request.FILES.get('ImageInput')
            print(request.FILES)
            if photo:
                print(2)
                group.photo = photo
                group.save()
            return redirect('chats', pk=request.user.pk)
        