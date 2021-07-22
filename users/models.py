from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(verbose_name='эл. почта пользователя', max_length=256, unique=True)
