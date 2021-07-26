from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название проекта', max_length=256)
    users_on_projects = models.ManyToManyField(User, verbose_name='Пользователей учавствуют')
    repository_link = models.URLField(verbose_name='Адрес репозитория')
    description = models.TextField(verbose_name='Описание продукта', max_length=64, blank=True, null=True)


class Todo(models.Model):
    project_name = models.OneToOneField(Project, verbose_name='Проект заметки', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Содержимое заметки', max_length=1024, blank=True, null=True)
    author = models.OneToOneField(User, verbose_name='Автор заметки', on_delete=models.DO_NOTHING)
    created_at = models.DateField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateField(auto_now_add=True, verbose_name='Дата последнего обновления')
    is_active = models.BooleanField(default=True, verbose_name='Состояние заметки')