from django.views.generic import TemplateView
from authorization.models import UserProfile
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse

class FriendsView(TemplateView):
    template_name = "friends.html"


    def post(self, request, *args, **kwargs):
        if request.POST.get("delete"):
            button = request.POST.get("delete")

        return HttpResponseRedirect('/friends/')
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        
        all_users = list(User.objects.all())
        user_object = User.objects.get(username = self.request.user)
        friends = []
        all_friends = []
        requests = []
        all_requests = []
        recomended_friends = []
        for friend_profile in user_object.friends.all():
            all_friends.append(friend_profile.user)
            if len(friends) < 6:
                friends.append(friend_profile.user)
        for user in user_object.profile.friends.all():
            all_friends.append(user)
            if len(requests) < 6:
                friends.append(user)
        context["friends"] = friends
        for user in user_object.requests.all():
            all_requests.append(user.user)
            if len(requests) < 6:
                requests.append(user.user)
        context["requests"] = requests
        user_requests = list(user_object.profile.requests.all())
        print(context["requests"])
        for user in all_users:
            if user != user_object and user not in all_friends and user not in all_requests and user not in user_requests:
                recomended_friends.append(user)
                if len(recomended_friends) == 6:
                    break
        context['recomended_friends'] = recomended_friends
        return context
    
class RequestsView(TemplateView):
    template_name = "requests.html"

    def post(self, request, *args, **kwargs):
        if request.POST.get("accept"):
            button = request.POST.get("accept")
            
            user = User.objects.get(id = button)
            profile_now = UserProfile.objects.get(user_id = request.user.pk)
            all_friends = list(profile_now.friends.all())
            all_friends.append(user)
            profile_now.friends.set(all_friends)
            profile_now.save()

            all_requests = list(profile_now.requests.all())
            all_requests.remove(user)
            profile_now.requests.set(all_requests)
            profile_now.save()

        elif request.POST.get("decline"):
            button = request.POST.get("decline")

            user = User.objects.get(id = button)
            profile_now = UserProfile.objects.get(user_id = request.user.pk)
            all_requests = list(profile_now.requests.all())
            all_requests.remove(user)
            profile_now.requests.set(all_requests)
            profile_now.save()

        return HttpResponseRedirect('/requests/')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        user_object = User.objects.get(username = self.request.user)
        context["requests"] = user_object.profile.requests.all()

        return context

class RecomendationsView(TemplateView):
    template_name = "recomendations.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        all_users = list(User.objects.all())
        user_object = User.objects.get(username = self.request.user)
        friends = []
        all_friends = []
        requests = []
        all_requests = []
        recomended_friends = []
        for friend_profile in user_object.friends.all():
            all_friends.append(friend_profile.user)
            if len(friends) < 6:
                friends.append(friend_profile.user)
        for user in user_object.profile.friends.all():
            all_friends.append(user)
            if len(requests) < 6:
                friends.append(user)
        context["friends"] = friends
        for user in user_object.requests.all():
            all_requests.append(user.user)
            if len(requests) < 6:
                requests.append(user.user)
        context["requests"] = requests
        user_requests = list(user_object.profile.requests.all())
        print(context["requests"])
        for user in all_users:
            if user != user_object and user not in all_friends and user not in all_requests and user not in user_requests:
                recomended_friends.append(user)
                if len(recomended_friends) == 6:
                    break
        context['recomended_friends'] = recomended_friends

        return context
    
class AllFriendsView(TemplateView):
    template_name = "all_friends.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_object = User.objects.get(username = self.request.user)
        friends = []
        for friend in user_object.friends.all():
            friends.append(friend.user)
        for friend in user_object.profile.friends.all():
            friends.append(friend)


        
        context["friends"] = friends
        return context
    
def request_friend(request, pk):
    user = User.objects.get(id = pk)
    profile_now = UserProfile.objects.get(user_id = request.user.pk)
    all_requests = list(profile_now.requests.all())
    all_requests.append(user)
    profile_now.requests.set(all_requests)
    profile_now.save()

    return JsonResponse({"status": "ok"})

def accept_friend(request, pk):
    user = User.objects.get(id = pk)
    profile_now = UserProfile.objects.get(user_id = request.user.pk)
    profile_user = UserProfile.objects.get(user_id = user.pk)
    all_friends = list(profile_now.friends.all())
    all_friends.append(user)
    profile_now.friends.set(all_friends)
    profile_now.save()

    all_requests = list(request.user.requests.all())
    all_requests.remove(profile_user)
    request.user.requests.set(all_requests)
    profile_now.save()

    return JsonResponse({"status": "ok"})

def delete_friend(request, pk):
    user = User.objects.get(id = pk)
    profile_now = UserProfile.objects.get(user_id = request.user.pk)
    profile_user = UserProfile.objects.get(user_id = user.pk)
    all_friends = list(profile_now.friends.all())
    if user in all_friends:
        all_friends.remove(user)
        profile_now.friends.set(all_friends)
        profile_now.save()
    else:
        all_friends = list(profile_user.friends.all())
        all_friends.remove(request.user)
        profile_user.friends.set(all_friends)
        profile_user.save()

    return JsonResponse({"status": "ok"})

class FriendView(TemplateView):
    template_name = "friend_info.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        friend = User.objects.get(id = self.kwargs['friend_pk'])
        context["friend"] = friend
        
        return context