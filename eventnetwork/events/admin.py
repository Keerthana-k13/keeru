from django.contrib import admin
from .models import Event, Registration, Suggestion

admin.site.register(Event)
admin.site.register(Registration)
admin.site.register(Suggestion)
