from django.db import models
from django.conf import settings  

class Event(models.Model):
    CATEGORY_CHOICES = (
        ('technical', 'Technical'),
        ('non-technical', 'Non-Technical'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateTimeField()
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='organized_events'
    )
    image = models.ImageField(upload_to='events/', null=True, blank=True)

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    participant = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    registered_at = models.DateTimeField(auto_now_add=True)
    google_form_url = models.URLField()

class Suggestion(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    suggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
