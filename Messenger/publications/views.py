from django.views.generic import CreateView
from .models import User_Post
from django.urls import reverse_lazy

class MyPublicationsView(CreateView):
    template_name = "publications/my_publications.html"
    model = User_Post
    fields = ['title', 'subject', 'tags', 'text', 'article_link']
    success_url = reverse_lazy('my_publications')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_posts'] = User_Post.objects.all()
        return context