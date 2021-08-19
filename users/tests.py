from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

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

    # def test_post_client(self):
    #     admin = User.objects.create_superuser('test', 'test@test.ru', 'qwerty')
    #     client = APIClient()
    #     client.login(username='test', password='qwerty')
    #     response = client.post(self.url, {
    #         "username": "gsgs",
    #         "first_name": "tertw",
    #         "last_name": "tewtew",
    #     })
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)



    def test_get_detail(self):
        user = User.objects.create(username='test', first_name='dddd', last_name="ffff")
        response = client.get(f'{self.url}/{user.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('first_name'), user.first_name)
#
# def test_post(self):
#     factory = APIRequestFactory()
#     request = factory.post(self.url,{
#         "count": 5,
#         "next": 'null',
#         "previous": 'null',
#         "results": [
#             {
#                 "id": 1,
#                 "password": "4321",
#                 "last_login": 'Null',
#                 "is_superuser": 'true',
#                 "username": "ural",
#                 "first_name": "tertw",
#                 "last_name": "tewtew",
#                 "is_staff": 'false',
#                 "is_active": 'false',
#                 "date_joined": "2021-08-01T21:28:19Z",
#                 "email": "tewte@r",
#                 "groups": [
#                     2
#                 ],
#                 "user_permissions": []
#             }
#         ]
#     })
#     view = UserViewSet.as_view({'post': 'create'})
#     response = view(request)
#     print(response)
#     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
