from django.views.generic.edit import CreateView 
from django.contrib.auth.views import LoginView, LogoutView 
from django.urls import reverse_lazy 
from django.contrib.auth.models import User 
from django.contrib.sites.shortcuts import get_current_site 
from django.template.loader import render_to_string 
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode 
from django.utils.encoding import force_bytes, force_str 
from django.core.mail import EmailMessage 
from django.shortcuts import render, redirect 
from django.contrib.auth import login 
from django.views import View 
 
from .forms import RegistrationForm 
from .tokens import account_activation_token 
 
class RegisterView(CreateView): 
    form_class = RegistrationForm 
    template_name = "authorization/registration/registration.html" 
    success_url = reverse_lazy("email_verification_sent") 
     
    def form_valid(self, form): 
        user = form.save() 
        current_site = get_current_site(self.request) 
        mail_subject = 'Activate your account' 
        message = render_to_string('authorization/email/account_activation_email.html', { 
            'user': user, 
            'domain': current_site.domain, 
            'uid': urlsafe_base64_encode(force_bytes(user.pk)), 
            'token': account_activation_token.make_token(user), 
        }) 
        to_email = form.cleaned_data.get('email') 
        email = EmailMessage( 
            mail_subject, message, to=[to_email] 
        ) 
        email.send() 
        return super().form_valid(form) 
 
class EmailVerificationSentView(View): 
    def get(self, request): 
        return render(request, 'authorization/registration/verification_sent.html') 
 
class ActivateAccountView(View): 
    def get(self, request, uidb64, token): 
        try: 
            uid = force_str(urlsafe_base64_decode(uidb64)) 
            user = User.objects.get(pk=uid) 
        except (TypeError, ValueError, OverflowError, User.DoesNotExist): 
            user = None 
             
        if user is not None and account_activation_token.check_token(user, token): 
            user.is_active = True 
            user.save() 
            login(request, user) 
            return redirect('login') 
        else: 
            return render(request, 'authorization/registration/activation_invalid.html') 
 
class CustomLoginView(LoginView): 
    template_name = "authorization/login/login.html" 
 
class CustomLogoutView(LogoutView): 
    next_page = "login"