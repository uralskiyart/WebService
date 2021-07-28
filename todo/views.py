from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', None)
        if name:
            return Project.objects.filter(name=name)
        return Project.objects.all()


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()





