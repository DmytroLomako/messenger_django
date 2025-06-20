from django import forms
from .models import Post


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
        model = Post
        fields = ['title', 'tags', 'content']   

    def __init__(self, *args, **kwargs):
        super(CreatePostForm, self).__init__(*args, **kwargs)
        self.fields['title'].label = "Назва публікації"
        self.fields["content"].label =""


        self.fields["title"].widget = forms.TextInput(attrs={"placeholder": "Напишить назву публікації"})
        self.fields["content"].widget = forms.Textarea(attrs={"placeholder": "Напишить текст до публікації"})
        
    images = MultipleFileField(required=False)
