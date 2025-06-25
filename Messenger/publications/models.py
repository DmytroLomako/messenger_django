from django.db import models
from django.contrib.auth.models import User
from authorization.models import Profile


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=4096)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    images = models.ManyToManyField("Image", blank=True, related_name= "posts_authored")
    views = models.ManyToManyField(Profile, related_name='posts_viewed', blank=True)
    likes = models.ManyToManyField(Profile, related_name='posts_liked', blank=True)
    tags = models.ManyToManyField("Tag", blank=True)
    topic = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
    # def count_views(self):
    #     return self.views.count()
    
    # def count_likes(self):
    #     return self.likes.count()
    


class Image(models.Model):
    filename = models.CharField(max_length=150)
    file = models.ImageField(upload_to= "images/posts", null= True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.filename
    

class Tag(models.Model):
    name = models.CharField(max_length= 50, unique=True)

    def __str__(self):
        return self.name
    

class Link(models.Model):
    url = models.URLField(max_length= 200)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f'Посилання для поста "{self.post}"'