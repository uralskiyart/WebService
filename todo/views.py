from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from .filters import ProjectFilter, TodoFilter

class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    queryset = Project.objects.all()


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    filterset_class = TodoFilter
    pagination_class = TodoLimitOffsetPagination
    queryset = Todo.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        response = {'message': 'Now Note is not active!'}
        return Response(response, status=status.HTTP_403_FORBIDDEN)









