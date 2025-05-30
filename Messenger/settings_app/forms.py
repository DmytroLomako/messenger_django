from django import forms
from django.contrib.auth.models import User
from authorization.models import UserProfile


class UserUpdateForm(forms.ModelForm):
    new_password = forms.CharField(
        widget=forms.PasswordInput(),  
        required=False,
        label="Password"
    )
    
    birthday = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'date-field'}),
        required=False,
        label="Birthday"
    )
    
    class Meta:
        model = User
        fields = ["username", 'last_name', 'email']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            try:
                self.fields['birthday'].initial = self.instance.profile.birthday
            except UserProfile.DoesNotExist:
                pass
                
    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.birthday = self.cleaned_data.get('birthday')        
            profile.save()
        return user