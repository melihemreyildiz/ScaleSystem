from django.db import models
from django.contrib.auth.models import User


class Route(models.Model):
    name = models.CharField(max_length=100)
    hostname = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_superuser = models.BooleanField(default=False)
