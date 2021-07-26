from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
