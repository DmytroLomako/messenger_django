from django import forms
from django.contrib.auth.models import User
from authorization.models import Profile


class UserUpdateForm(forms.ModelForm):
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'readonly': True, "class": "input"}),  
        required=False,
        label="Пароль"
    )
    
    birthday = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'date-field', "readonly": True, "class": "input"}),
        required=False,
        label="Дата народження"
    )

    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'readonly': True, "class": "input"}),  
        required=False,
        label="Ім'я"
    )

    last_name = forms.CharField(
        widget=forms.TextInput(attrs={'readonly': True, "class": "input"}),  
        required=False,
        label="Призвіще"
    )
    
    email = forms.CharField(
        widget=forms.EmailInput(attrs={'readonly': True, "class": "input"}),  
        required=False,
        label="Електронна адресса"
    )

    class Meta:
        model = User
        fields = ["first_name", 'last_name', 'email']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            try:
                self.fields['birthday'].initial = self.instance.profile.date_of_birth

            except Profile.DoesNotExist:
                pass
                
    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            profile, created = Profile.objects.get_or_create(user=user)
            profile.date_of_birth = self.cleaned_data.get('birthday')        
            profile.save()
        return user