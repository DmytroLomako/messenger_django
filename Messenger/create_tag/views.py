from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.views.generic import TemplateView
from .forms import CreateTagForm
from .models import Tag
from django.urls import reverse_lazy

# Create your views here.


class CreateTagView(CreateView):
    form_class = CreateTagForm
    template_name = "create_tag.html"
    success_url = reverse_lazy("main")

    def form_valid(self, form):
        tag = form.save(commit=False)
        tag.save()
        return super().form_valid(form)