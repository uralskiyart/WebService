from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin

from .serializers import UserSerializer, UserSerializerV2


from .models import User


# class UserViewSet(ModelViewSet):
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


class UserViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # serializer_class = UserSerializer
    queryset = User.objects.all()


    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerV2
        return UserSerializer

