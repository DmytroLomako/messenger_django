from django.views.generic import TemplateView
from authorization.models import UserProfile
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect

class FriendsView(TemplateView):
    template_name = "friends.html"


    def post(self, request, *args, **kwargs):
        if request.POST.get("add"):
            button = request.POST.get("add")

            user = User.objects.get(id = button)
            profile_now = UserProfile.objects.get(user_id = request.user.pk)
            all_requests = list(profile_now.requests.all())
            all_requests.append(user)

            print(all_requests)

        

            profile_now.requests.set(all_requests)
            profile_now.save()

        elif request.POST.get("delete"):
            button = request.POST.get("delete")

        return HttpResponseRedirect('/friends/')
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        recomended_friends = [][0:6]    
        user_object = User.objects.get(username = self.request.user)
        all_friends = list(User.objects.all())
        all_friends_requests = list(user_object.profile.requests.all())
        final_friends = []

        for friend in all_friends:
            if friend != user_object and friend not in all_friends_requests:
                final_friends.append(friend)
                print(friend.profile)


        if user_object in recomended_friends:
            final_recomended_friends = []
            print(final_recomended_friends)
            context["recomended_friends"] = final_recomended_friends
        else:   
            context["recomended_friends"] = recomended_friends

        return context
    
