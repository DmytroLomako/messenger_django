from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('email-verification-sent/', EmailVerificationSentView.as_view(), name='email_verification_sent'),
    path('activate/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate'),

]
