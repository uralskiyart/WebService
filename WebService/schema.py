import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, Todo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'



class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):

        return Project.objects.all()

    # all_todoes = graphene.List(TodoType)

    # def resolve_all_todoes(self, info):
    #     return Todo.objects.all()
    #
    # projects_by_todoes = graphene.Field(ProjectType, id=graphene.Int(required=True))
    #
    # def resolve_projects_by_todoes(self, info, id=None):
    #     projects = Project.objects.all()
    #         if id:
    #             projects = projects.filter(project_id=id)
    #             return todoes

    todoes_by_project = graphene.List(TodoType, project_name=graphene.String(required=False))


    def resolve_todoes_by_project(self, info, project_name=None):
        todoes = Todo.objects.all()
        if id:
            todoes = todoes.filter(project_name=project_name)
            return todoes





schema = graphene.Schema(query=Query)
