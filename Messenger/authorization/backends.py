from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend


class LoginEmail(ModelBackend):
    def authenticate(self, request, username = None, password = None, **kwargs):
        try:
            print(User.objects.values_list("email"))
            if username not in User.objects.values_list("email"):
                user = User.objects.get(email=username) 
                if user.check_password(password): 
                    return user
        except User.DoesNotExist:
            return None