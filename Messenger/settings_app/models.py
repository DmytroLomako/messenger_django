from django.db import models
from publications.models import Tag
from authorization.models import Profile

# Create your models here.
class Image(models.Model):
    filename = models.CharField(max_length=150)
    file = models.ImageField(upload_to='images/posts')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.filename

class Album(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)
    preview_image = models.ImageField(upload_to='images/album_previews', null=True, blank=True)
    images = models.ManyToManyField(Image, blank=True)
    shown = models.BooleanField(default=True)
    topic = models.ForeignKey(Tag, on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name