from django import forms
from django.contrib.auth.models import User


class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        

        widgets = {
            "username": forms.TextInput(attrs={"class": 'username', "placeholder": "username"}),
            'password': forms.TextInput(attrs={'class': 'pasword', "type" : "password", "placeholder": "password"}),
            'email': forms.TextInput(attrs={"class": 'email', "placeholder": "email"}),
        }



class LoginForm(forms.Form):
    username = forms.CharField(widget = forms.TextInput(attrs={"class": 'username', "placeholder": "username", "name" : "username"}))
    password = forms.CharField(widget= forms.TextInput(attrs={'class': 'pasword', "type" : "password", "placeholder": "password", "name" : "password"}))

