from django import forms
from .models import User_Post

class CreatePostForm(forms.ModelForm):
    class Meta():
        model = User_Post
        fields = ['title', 'subject', "images", 'tags', 'text', 'article_link']




# class ImageForm(forms.ModelForm):
#     class Meta():
#         model = Images
#         fields = ["image"]
#     images = forms.ImageField(widget= forms.ClearableFileInput(attrs={
#             "required": False 
#         }))