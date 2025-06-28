from django.views.generic import TemplateView
from user_app.models import Profile, Friendship
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from post_app.models import Post
from django.shortcuts import redirect

class FriendsView(TemplateView):
    template_name = "friends.html"


    def post(self, request, *args, **kwargs):
        if request.POST.get("delete"):
            button = request.POST.get("delete")

        return HttpResponseRedirect('/friends/')
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        
        all_accepted = []

        user = self.request.user
        
        all_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = True)
        all_accepted_sent_requests = Friendship.objects.filter(profile1 = Profile.objects.get(user = user), accepted = True)
        for request in all_accepted_get_requests:
            all_accepted.append(request)
        for request in all_accepted_sent_requests:
            all_accepted.append(request)

        context["friends"] = all_accepted

        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        recomended = Profile.objects.all()

        final_recomended = []

        for profile in recomended:
            print(profile.id)
            print(Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2"))
            if profile != Profile.objects.get(user = user) and (profile.id,) not in Friendship.objects.filter(profile2 = Profile.objects.get(user = user)).values_list("profile1") and (profile.id,) not in Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2") and (profile.id,) not in all_not_accepted_get_requests.values_list("profile1"):
                final_recomended.append(profile)

        context['recomended_friends'] = final_recomended

        return context
    
    def dispatch(self, request, *args, **kwargs):
        try:
            if not request.user.is_authenticated:
                return redirect("register")
        except:
            return redirect("register")
        return super().dispatch(request, *args, **kwargs)

    
class RequestsView(TemplateView):
    template_name = "requests.html"

    def post(self, request, *args, **kwargs):
        if request.POST.get("accept"):
            button = request.POST.get("accept")
            
            user = User.objects.get(id = button)
            profile_now = Profile.objects.get(user_id = request.user.pk)
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
            profile_now = Profile.objects.get(user_id = request.user.pk)
            all_requests = list(profile_now.requests.all())
            all_requests.remove(user)
            profile_now.requests.set(all_requests)
            profile_now.save()

        return HttpResponseRedirect('/requests/')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        all_accepted = []

        user = self.request.user
        
        all_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = True)
        all_accepted_sent_requests = Friendship.objects.filter(profile1 = Profile.objects.get(user = user), accepted = True)
        for request in all_accepted_get_requests:
            all_accepted.append(request)
        for request in all_accepted_sent_requests:
            all_accepted.append(request)

        context["friends"] = all_accepted

        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        recomended = Profile.objects.all()

        final_recomended = []

        for profile in recomended:
            print(profile.id)
            print(Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2"))
            if profile != Profile.objects.get(user = user) and (profile.id,) not in Friendship.objects.filter(profile2 = Profile.objects.get(user = user)).values_list("profile1") and (profile.id,) not in Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2") and (profile.id,) not in all_not_accepted_get_requests.values_list("profile1"):
                final_recomended.append(profile)

        context['recomended_friends'] = final_recomended

        return context

class RecomendationsView(TemplateView):
    template_name = "recomendations.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        all_accepted = []

        user = self.request.user
        
        all_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = True)
        all_accepted_sent_requests = Friendship.objects.filter(profile1 = Profile.objects.get(user = user), accepted = True)
        for request in all_accepted_get_requests:
            all_accepted.append(request)
        for request in all_accepted_sent_requests:
            all_accepted.append(request)

        context["friends"] = all_accepted

        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        recomended = Profile.objects.all()

        final_recomended = []

        for profile in recomended:
            print(profile.id)
            print(Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2"))
            if profile != Profile.objects.get(user = user) and (profile.id,) not in Friendship.objects.filter(profile2 = Profile.objects.get(user = user)).values_list("profile1") and (profile.id,) not in Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2") and (profile.id,) not in all_not_accepted_get_requests.values_list("profile1"):
                final_recomended.append(profile)

        context['recomended_friends'] = final_recomended

        return context

        return context
    
class AllFriendsView(TemplateView):
    template_name = "all_friends.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        all_accepted = []

        user = self.request.user
        
        all_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = True)
        all_accepted_sent_requests = Friendship.objects.filter(profile1 = Profile.objects.get(user = user), accepted = True)
        for request in all_accepted_get_requests:
            all_accepted.append(request)
        for request in all_accepted_sent_requests:
            all_accepted.append(request)

        context["friends"] = all_accepted

        all_not_accepted_get_requests = Friendship.objects.filter(profile2 = Profile.objects.get(user = user), accepted = False)

        context["requests"] = all_not_accepted_get_requests

        recomended = Profile.objects.all()

        final_recomended = []

        for profile in recomended:
            print(profile.id)
            print(Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2"))
            if profile != Profile.objects.get(user = user) and (profile.id,) not in Friendship.objects.filter(profile2 = Profile.objects.get(user = user)).values_list("profile1") and (profile.id,) not in Friendship.objects.filter(profile1 = Profile.objects.get(user = user)).values_list("profile2") and (profile.id,) not in all_not_accepted_get_requests.values_list("profile1"):
                final_recomended.append(profile)

        context['recomended_friends'] = final_recomended

        return context
    
def request_friend(request, pk):
    if Friendship.objects.get_or_create(profile1 = Profile.objects.get(user = request.user), profile2 = Profile.objects.get(id = pk)) == None and Friendship.objects.get_or_create(profile1 =Profile.objects.get(user= User.objects.get(id = pk)), profile2 =  Profile.objects.get(user = request.user)) == None:
        new_friendship = Friendship.objects.create(profile1 = Profile.objects.get(user = request.user), profile2 = Profile.objects.get(id = pk))
        new_friendship.save()

    return JsonResponse({"status": "ok"})

def accept_friend(request, pk):
    print(request.POST.get("friendship_id"))
    accept_friendship = Friendship.objects.get(id = int(request.POST.get("friendship_id")))
    accept_friendship.accepted = True
    accept_friendship.save()

    return JsonResponse({"status": "ok"})
    # user = User.objects.get(id = pk)
    # profile_now = Profile.objects.get(user_id = request.user.pk)
    # profile_user = Profile.objects.get(user_id = user.pk)
    # all_friends = list(profile_now.friends.all())
    # all_friends.append(user)
    # profile_now.friends.set(all_friends)
    # profile_now.save()

    # all_requests = list(request.user.requests.all())
    # all_requests.remove(profile_user)
    # request.user.requests.set(all_requests)
    # profile_now.save()


def delete_friend(request, pk):
    print(pk)
    profile_now = Profile.objects.get(id = request.user.pk)
    profile_user = Profile.objects.get(id = pk)
    try:
       Friendship.objects.get(profile1 =  profile_now, profile2 = profile_user, accepted = True).delete()
    except:
        Friendship.objects.get(profile1 =  profile_user, profile2 = profile_now, accepted = True).delete()
    return JsonResponse({"status": "ok"})

class FriendView(TemplateView):
    template_name = "friend_info.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        print(Profile.objects.get(id = int(self.kwargs['friend_pk'])))
        friend = Profile.objects.get(id = int(self.kwargs['friend_pk']))
        context["friend"] = friend
        all_user_posts = Post.objects.filter(author = Profile.objects.get(user = self.request.user))
        views_count = 0
        for post in all_user_posts:
            views_count += len(post.views.all())
        context["readers"] = views_count

        friend_posts = reversed(Post.objects.filter(author = friend).all())
        context["friend_posts"] = friend_posts
        
        return context