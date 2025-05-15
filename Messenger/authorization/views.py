from django.views.generic.edit import CreateView
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.views import View
from .forms import *
from .models import VerificationCode
class RegisterView(CreateView):
    form_class = RegistrationForm
    template_name = "authorization/registration/registration.html"
    success_url = reverse_lazy("email_verification_sent")
    
    def form_valid(self, form):
        user = form.save()
        user.username = user.pk
        verification_code = VerificationCode.generate_code()
        VerificationCode.objects.create(user=user, code=verification_code)
        
        mail_subject = 'Activate your account'
        message = render_to_string('authorization/email/account_activation_email.html', {
            'user': user,
            'code': verification_code,
        })
        to_email = form.cleaned_data.get('email')
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        email.send()
        
        self.request.session['verification_user_id'] = user.id
        return super().form_valid(form)

class EmailVerificationSentView(View):
    def get(self, request):
        if 'verification_user_id' not in request.session:   
            return redirect('register')
        return render(request, 'authorization/registration/verification_sent.html')

        

class VerifyCodeView(View):
    def post(self, request):
        code = f"{request.POST.get('verification_code1')}{request.POST.get('verification_code2')}{request.POST.get('verification_code3')}{request.POST.get('verification_code4')}{request.POST.get('verification_code5')}{request.POST.get('verification_code6')}"
        user_id = request.session.get('verification_user_id')

        print(code)

        if not user_id:
            return redirect('register')
        
        try:
            user = User.objects.get(pk=user_id)
            
            verification = VerificationCode.objects.get(user=user)
            
            if verification.code == code and verification.is_valid():
                user.is_active = True
                user.save()
                verification.delete()
                
                if 'verification_user_id' in request.session:
                    del request.session['verification_user_id']
                
                login(request, user)
                return redirect('login')
            else:
                return render(request, 'authorization/registration/verification_failed.html')
        except (User.DoesNotExist, VerificationCode.DoesNotExist):
            return render(request, 'authorization/registration/verification_failed.html')

class CustomLoginView(LoginView):
    template_name = "authorization/login/login.html"
    form_class = CustomLoginForm

class CustomLogoutView(LogoutView):
    next_page = "login"