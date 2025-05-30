from django.views.generic import TemplateView


class OptionsView(TemplateView):
    template_name = "options.html"