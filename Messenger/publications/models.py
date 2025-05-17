from django.db import models
from django.contrib.auth.models import User
from create_tag.models import Tag


# Create your models here.
class User_Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    tags = models.ManyToManyField(Tag)
    images = models.ImageField(upload_to= "images/", null= True)
    text = models.TextField()
    article_link = models.URLField(blank=True, null=True)
    views = models.ManyToManyField(User, related_name='viewed_posts', blank=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    
    def count_views(self):
        return self.views.count()
    
    def count_likes(self):
        return self.likes.count()
    


# class Images(models.Model):
#     post = models.ForeignKey(User_Post, on_delete= models.CASCADE)
#     image = models.ImageField(upload_to= "images/", null= True)