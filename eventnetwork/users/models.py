from django.contrib.auth.models import AbstractUser
from django.db import models
from events.models import Event  # OK because Event now doesn't import User

class User(AbstractUser):
    ROLE_CHOICES = (
        ('organizer', 'Organizer'),
        ('participant', 'Participant'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

class Certificate(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    file = models.FileField(upload_to='certificates/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
