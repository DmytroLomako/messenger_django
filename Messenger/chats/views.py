from django.views.generic import TemplateView


class ChatsView(TemplateView):
    template_name = "chats.html"