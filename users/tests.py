from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

from users.models import User
from users.views import UserViewSet


class TestUserViewSet(TestCase):
    url = '/api/users/'

    def setUp(self):
        factory = APIRequestFactory()
        self.request = factory.get(self.url)

    def test_get_list(self):
        view = UserViewSet.as_view({'get': 'list'})
        response = view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        factory = APIRequestFactory()
        request = factory.post(self.url,{
            "count": 5,
            "next": 'null',
            "previous": 'null',
            "results": [
                {
                    "id": 1,
                    "password": "4321",
                    "last_login": 'Null',
                    "is_superuser": 'true',
                    "username": "ural",
                    "first_name": "tertw",
                    "last_name": "tewtew",
                    "is_staff": 'false',
                    "is_active": 'false',
                    "date_joined": "2021-08-01T21:28:19Z",
                    "email": "tewte@r",
                    "groups": [
                        2
                    ],
                    "user_permissions": []
                }
            ]
        })
        view = UserViewSet.as_view({'post': 'create'})
        response = view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_detail(self):
        user = User.objects(id=1,password=4321,last_login=None,username="ural")
        client = APIClient()
