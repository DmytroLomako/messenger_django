from django.views.generic import CreateView
from .models import User_Post, Images
from django.urls import reverse_lazy
from .forms import CreatePostForm

class MyPublicationsView(CreateView):
    template_name = "publications/my_publications.html"
    form_class = CreatePostForm
    success_url = reverse_lazy('my_publications')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        post = form.save()
        files = self.request.FILES.getlist('images')
        for file in files:
            Images.objects.create(post=post, image=file)
        post.save()
        return super().form_valid(form)
    
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = User_Post.objects.all()
        return context