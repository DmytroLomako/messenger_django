from django.views.generic import CreateView, TemplateView, FormView
from .models import ChatGroup
from authorization.models import UserProfile
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import MessageForm
from .models import ChatMessage
from publications.models import Images
import os
from django.conf import settings


class ChatsView(CreateView):
    template_name = "chats.html"
    model = ChatGroup
    fields = ["name", "users", "avatar_group"]

    def post(self, request, *args, **kwargs):
        print(ChatGroup.objects.filter(name = request.POST.get("group_name")))
        if not ChatGroup.objects.filter(name = request.POST.get("group_name")):
            group = ChatGroup.objects.create(
                name = request.POST.get("group_name"),
            )

            list_of_add_users = request.POST.get("choosedUsers").split("_")
            final_list_add = [request.user.id]

            for user_id in list_of_add_users:
                if user_id != "":
                    final_list_add.append(user_id)

            file = request.FILES.get('avatar_group')

            filename = f"groups_avatars/{file.name}"
            
            destination = os.path.join(settings.MEDIA_ROOT, filename)

            with open(destination, 'wb+') as destination_file:
                for chunk in file.chunks():
                    destination_file.write(chunk)
                    group.avatar_group = filename
                    group.save()

            print(file)


            group.users.set(final_list_add)

            group.save()

            print(request.POST)
        return super().post(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_profile_now = UserProfile.objects.get(id = self.request.user.id)
        print(user_profile_now.friends)

        context["friends"] = user_profile_now.friends.all()

        print(ChatGroup.objects.last())
        if len(ChatGroup.objects.all()) == 0:
            context["group_id"] =  0
        else:
            context["group_id"] =  ChatGroup.objects.all().last().id + 1
        return context

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
        


def create_chat(request, user_pk):


    user_to_connect = User.objects.get(pk=user_pk)
    current_user = User.objects.get(pk=request.user.pk)
    groups_of_user_to_connect = ChatGroup.objects.filter(users=user_to_connect,personal_chat=True)
    group_personal_chat = groups_of_user_to_connect.filter(users = current_user).first()
    if not group_personal_chat:
        group_personal_chat = ChatGroup.objects.create(
            name=f'personal, users: {current_user}-{user_to_connect}',
            personal_chat=True
        )
        group_personal_chat.users.set([current_user,user_to_connect])
        group_personal_chat.save()
    return redirect("chat_group",group_personal_chat.pk)


class ChatView(FormView):
    '''
    Клас, який відповідає за відображення конкретної чат-групи    
    '''
    template_name = "chat.html"
    form_class = MessageForm

    def dispatch(self, request, *args, **kwargs):
        '''
        Метод, який першим приймає запит від веб-сервера, та з'ясовує який це тип запиту. 
        '''
        # Отримуємо об'єкт авторизованого користувача.
        user = request.user
        # Отримуємо pk групи з динамічної url адреси.
        chat_group_pk = self.kwargs['group_pk']
        # Отримуємо об'єкт групи за її pk.
        chat_group = ChatGroup.objects.get(pk=chat_group_pk)
        # Якщо користувач є у списку учасників групи
        if user in chat_group.users.all():
            # Продовжуємо обробку запиту.
            return super().dispatch(request, *args, **kwargs)
        # Перенаправляємо користувача на головну сторінку.
        return redirect("group_list")
    
    def get_context_data(self, **kwargs):
        '''
            Метод для додавання у контекст для класів відображення
        '''


        group = ChatGroup.objects.get(id = self.kwargs["group_pk"])
        members_count = len(group.users.all())
        # Отримуємо об'єкт контексту з батьківського класу FormView 
        context = super().get_context_data(**kwargs)
        # Отримуємо pk групи з kwargs (Тобто з дінамічного url адрессу)
        chat_group_pk = self.kwargs['group_pk']
        user_profile_now = UserProfile.objects.get(id = self.request.user.id)
        # Додаємо у контекст групу
        context['group'] = group
        # Додаємо у контекст усі повідомлення групи
        context['len_members'] =  members_count
        context['chat_messages'] =  ChatMessage.objects.filter(chat_group_id = chat_group_pk)
        context["friends"] = user_profile_now.friends.all()

        # повертаємо контекст зі змінами
        return context
    
