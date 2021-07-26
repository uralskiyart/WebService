from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import  ProjectViewSet, TodoViewSet

app_name = 'todo'


router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('todo_notes', TodoViewSet)
