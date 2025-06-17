from django.views.generic import CreateView, TemplateView, FormView
from .models import ChatGroup
from authorization.models import Profile, Friendship
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import MessageForm
from .models import ChatMessage
from publications.models import Image
import os
from django.conf import settings


class ChatsView(CreateView):
    template_name = "chats.html"
    model = ChatGroup
    fields = ["name", "members", "avatar"]

    def post(self, request, *args, **kwargs):
        print(ChatGroup.objects.filter(name = request.POST.get("group_name")))
        if not ChatGroup.objects.filter(name = request.POST.get("group_name")):
            group = ChatGroup.objects.create(
                name = request.POST.get("group_name"),
                admin = Profile.objects.get(user = request.user)
            )

            list_of_add_users = request.POST.get("choosedUsers").split("_")
            final_list_add = [request.user.id]

            for user_id in list_of_add_users:
                if user_id != "":
                    final_list_add.append(user_id)

            file = request.FILES.get('avatar_group')
            print(file)


            group.avatar = file

            group.members.set(final_list_add)

            group.save()

            print(request.POST)
        return super().post(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_profile_now = Profile.objects.get(user_id = self.request.user.id)
        final_friends_list = []

        for friend in Friendship.objects.filter(profile2 = user_profile_now, accepted = True):
            final_friends_list.append(friend)
        for friend in Friendship.objects.filter(profile1 = user_profile_now, accepted = True):
            final_friends_list.append(friend)

        user_object = User.objects.get(username = self.request.user)
        
        list_personal_chats = ChatGroup.objects.filter(is_personal_chat = True)

        messeges = ChatMessage.objects.all()
        not_viewed_messeges = []

        for message in messeges:

            if user_profile_now not in message.views.all() and user_profile_now in message.chat_group.members.all() and user_profile_now != message.author:
                not_viewed_messeges.append(message)
        context["not_viewed_messeges"] = not_viewed_messeges
  

        context["friends"] = final_friends_list
        context["personal_chats"] = list_personal_chats
        
        context["groups"] = ChatGroup.objects.filter(members = Profile.objects.get(user = self.request.user))

        if len(ChatGroup.objects.all()) == 0:
            context["group_id"] =  0
        else:
            context["group_id"] =  ChatGroup.objects.all().last().id + 1
        return context
    

        

def save_group_photo(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            group, created = ChatGroup.objects.get_or_create(admin=Profile.objects.get(user = request.user))
            photo = request.FILES.get('ImageInput') 
            print("\n\n\n", request.FILES)
            print("\n\n\n\n", photo)
            if photo:
                print(2)
                group.avatar = photo
                print("\n\n\n\n", group)
                group.save()
            return redirect('chats')
        


def create_chat(request, user_pk):


    user_to_connect = Profile.objects.get(id=int(user_pk))
    current_user = Profile.objects.get(user = request.user)
    groups_of_user_to_connect = ChatGroup.objects.filter(members=user_to_connect,is_personal_chat=True)
    group_personal_chat = groups_of_user_to_connect.filter(members = current_user).first()
    if not group_personal_chat:
        group_personal_chat = ChatGroup.objects.create(
            name=f'{current_user}-{user_to_connect}',
            is_personal_chat=True,
            admin = current_user
        )
        group_personal_chat.members.set([current_user,user_to_connect])
        group_personal_chat.save()
    return redirect(f"chat", group_personal_chat.pk)


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
        user = Profile.objects.get(user = request.user)
        # Отримуємо pk групи з динамічної url адреси.
        chat_group_pk = self.kwargs['group_pk']
        # Отримуємо об'єкт групи за її pk.
        chat_group = ChatGroup.objects.get(pk=chat_group_pk)
        # Якщо користувач є у списку учасників групи
        if user in chat_group.members.all():
            # Отримпуємо усі повідомлення, що знаходяться у цій групі
            all_messages = ChatMessage.objects.filter(chat_group = chat_group)
            # Перебараємо усі повідомлення
            for message in all_messages:
                # Додаємо корисстувача у поле views за зв'язком ManyToMany
                message.views.add(user)
                # Збрегіаємо зв'язок з користувачем у БД
                message.save()
            return super().dispatch(request, *args, **kwargs)
        return redirect("chats")
    
    def get_context_data(self, **kwargs):
        '''
            Метод для додавання у контекст для класів відображення
        '''

        context = super().get_context_data(**kwargs)
        final_friends_list = []

        user_profile_now = Profile.objects.get(user = self.request.user)


        for friend in Friendship.objects.filter(profile2 = user_profile_now, accepted = True):
            final_friends_list.append(friend)
        for friend in Friendship.objects.filter(profile1 = user_profile_now, accepted = True):
            final_friends_list.append(friend)
        group = ChatGroup.objects.get(id = self.kwargs["group_pk"])
        members_count = len(group.members.all())
        # Отримуємо об'єкт контексту з батьківського класу FormView 
        # Отримуємо pk групи з kwargs (Тобто з дінамічного url адрессу)
        chat_group_pk = self.kwargs['group_pk']
        # Додаємо у контекст групу
        context['group'] = group
        # Додаємо у контекст усі повідомлення групи
        context['len_members'] =  members_count
        context['chat_messages'] =  reversed(ChatMessage.objects.filter(chat_group_id = chat_group_pk))
        context["friends"] = final_friends_list
        context["profile_now"] = user_profile_now
        # повертаємо контекст зі змінами
        return context
    
