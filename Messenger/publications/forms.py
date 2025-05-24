from django import forms
from .models import User_Post


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
    
    class Meta():
        model = User_Post
        fields = ['title', 'subject', 'tags', 'text', 'article_link']   

    def __init__(self, *args, **kwargs):
        super(CreatePostForm, self).__init__(*args, **kwargs)
        self.fields['title'].label = "Назва публікації"
        self.fields["subject"].label = "Тема публікації"
        self.fields["text"].label =""
        self.fields["article_link"].label = "Посилання"

        self.fields["title"].widget = forms.TextInput(attrs={"placeholder": "Напишить назву публікації"})
        self.fields["subject"].widget = forms.TextInput(attrs={"placeholder": "Напишить тему публікації"})
        self.fields["text"].widget = forms.Textarea(attrs={"placeholder": "Напишить текст до публікації"})
        self.fields["article_link"].widget = forms.TextInput(attrs={"placeholder": "Додайте посилання публікації"})
        
    images = MultipleFileField(required=False)
