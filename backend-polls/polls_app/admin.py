from django.contrib import admin
from polls_app.models import Polls, Vote, Choices

# Register your models here.

admin.site.register(Polls)
admin.site.register(Vote)
admin.site.register(Choices)
