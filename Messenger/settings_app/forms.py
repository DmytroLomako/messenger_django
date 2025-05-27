from django import forms
from django.contrib.auth.models import User


class UserUpdateForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(),  
        required=False
    )
    
    birthday = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'date-field'}),
        required=False,
        label="Birthday"
    )
    
    class Meta:
        model = User
        fields = ["username", 'last_name', 'birthday', 'email', 'password']