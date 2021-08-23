"""WebService URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from users.views import UserViewSet
from todo.views import ProjectViewSet, TodoViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('projects', ProjectViewSet, basename='projects')
router.register('todo_notes', TodoViewSet, basename='todo_notes')

schema_view = get_schema_view(
    openapi.Info(
        title='Users',
        default_version='v1',
        description='Some description',
        contact=openapi.Contact('some@mail.com')
    ),
    public=True,
    permission_classes=(AllowAny,)
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('swagger/', schema_view.with_ui('swagger')),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=False))),

    # path('api/2.0/users/', include('users.urls', namespace='v2'))
]
