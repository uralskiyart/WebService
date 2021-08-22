from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = 'username, is_superuser, is_staff'