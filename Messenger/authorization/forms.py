from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

class RegistrationForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ["username", 'email', 'password1', 'password2']
        widgets = {
            'email': forms.TextInput(attrs={"class": 'email', "placeholder": "you@gmail.com", 'required': True}),
        }
        
    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__(*args, **kwargs)
        self.fields['email'].label = "Електронна пошта"
        self.fields['password1'].widget = forms.PasswordInput(attrs={'class': 'password', "placeholder": "password"})
        self.fields['password1'].label = "Пароль"
        self.fields['password2'].widget = forms.PasswordInput(attrs={'class': 'password', "placeholder": "confirm password"})
        self.fields['password2'].label = "Підтвердити пароль"
        self.fields["password2"].help_text = None
        self.fields["password1"].help_text = None
        self.fields["email"].help_text = None


    def clean_email(self):
        email = self.cleaned_data.get('email')
        return email
    
    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.cleaned_data["username"]
        


        user.is_active = False 
        if commit:
            user.save()
        return user
    

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={"class": 'email', "placeholder": "you@example.com"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'password', "placeholder": "Введи пароль"}))