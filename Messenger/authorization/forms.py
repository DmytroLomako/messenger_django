from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegistrationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'email': forms.TextInput(attrs={"class": 'email', "placeholder": "email", 'required': True}),
        }
        
    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget = forms.TextInput(attrs={"class": 'username', "placeholder": "username"})
        self.fields['password1'].widget = forms.PasswordInput(attrs={'class': 'password', "placeholder": "password"})
        self.fields['password2'].widget = forms.PasswordInput(attrs={'class': 'password', "placeholder": "confirm password"})
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        return email
    
    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.is_active = False 
        if commit:
            user.save()
        return user