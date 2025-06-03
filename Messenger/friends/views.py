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

            if user not in all_requests:
                profile_now.requests.set(all_requests)
                profile_now.save()

        elif request.POST.get("delete"):
            button = request.POST.get("delete")

        return HttpResponseRedirect('/friends/')
    
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        recomended_friends = list(reversed(User.objects.all()))[0:6]    
        user_object = User.objects.get(username = self.request.user)

        if user_object in recomended_friends:
            final_recomended_friends = []
            for user in recomended_friends:
                if user != user_object:
                    final_recomended_friends.append(user)
                    print(user.profile)
            print(final_recomended_friends)
            context["recomended_friends"] = final_recomended_friends
        else:   
            context["recomended_friends"] = recomended_friends

        return context
    
