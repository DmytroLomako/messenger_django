from django.views.generic import TemplateView

class MyPublicationsView(TemplateView):
    template_name = "publications/my_publications.html"