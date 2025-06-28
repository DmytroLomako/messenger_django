from django import forms
from .models import Post, Link


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultipleFileField(forms.ImageField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result

class CreatePostForm(forms.ModelForm):
    links = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder": "Напишіть посилання до публікації"}))
    
    class Meta():
        model = Post
        fields = ['title', 'topic', 'tags', 'content']   

    def __init__(self, *args, **kwargs):
        super(CreatePostForm, self).__init__(*args, **kwargs)
        self.fields['title'].label = "Назва публікації"
        self.fields["content"].label =""
        self.fields["links"].label = "Посилання"
        self.fields["topic"].label = "Тема публікації"

        self.fields["title"].widget = forms.TextInput(attrs={"placeholder": "Напишіть назву публікації"})
        self.fields["content"].widget = forms.Textarea(attrs={"placeholder": "Напишіть текст до публікації"})
        self.fields["topic"].widget = forms.TextInput(attrs={"placeholder": "Напишіть тему публікації"})
        
    images = MultipleFileField(required=False)
    
    def save(self, commit=True):
        post = super().save(commit=commit)
        return post
