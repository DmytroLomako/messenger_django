from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.views.generic import TemplateView
from .forms import CreateTagForm
from .models import Tag
from django.urls import reverse_lazy

# Create your views here.


class CreateTagView(CreateView):
    form_class = CreateTagForm
    template_name = "create_tag.html"

    def form_valid(self, form):
        tag = form.save(commit=False)
        tag.name = f"#{tag.name}"
        tag.save()
        return redirect(reverse_lazy("my_publications"))
    def dispatch(self, request, *args, **kwargs):
        print(request.user)
        if request.user.username:
            return super().dispatch(request, *args, **kwargs)
        else:
            return redirect("login")