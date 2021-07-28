from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .serializers import UserSerializer


from .models import User


# class UserViewSet(ModelViewSet):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


class UserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UserSerializer
    queryset = User.objects.all()



