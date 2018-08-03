from django.contrib.auth import models as auth_models
from rest_framework import generics, mixins, response, status, views, viewsets
from rest_framework import permissions
from projects import models as projects_models
from projects import serializers as projects_serializers

# Create your views here.


class IsOwner(permissions.BasePermission):
    """
    A custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        print(obj.owner, request.user)
        return obj.owner == request.user


class ProjectViewset(viewsets.ModelViewSet):

    serializer_class = projects_serializers.ProjectSerializer
    queryset = projects_models.Project.objects.all()

    def create(self, request):
        data = request.data
        fields = {
            'name': data['name'],
            'description': data['description'],
            'ideal_capacity': data['idealCapacity'],
        }
        if 'projectLead' in data:
            fields['project_lead'] = data['projectLead']
            print('projectLead in data')
        if 'members' in data:
            fields['members'] = data['members']

        instance = projects_models.Project.objects.create(**fields)
        serializer = self.serializer_class(instance)
        return response.Response(serializer.data)

    def update(self, request, pk=None):
        data = request.data
        fields = {
            'name': data['name'],
            'description': data['description'],
            'ideal_capacity': data['idealCapacity'],
        }
        if 'projectLead' in data:
            project_lead = auth_models.User.objects.get(
                pk=data['projectLead'])
            fields['project_lead'] = project_lead

        self.queryset.filter(pk=pk).update(**fields)

        if 'members' in data:
            members = auth_models.User.objects.filter(pk__in=data['members'])
            self.queryset.get(pk=pk).members.set(members, clear=True)
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class ModifyProjectApproval(generics.UpdateAPIView):
    serializer_class = projects_serializers.ProjectSerializer
    queryset = projects_models.Project.objects.approved_projects()
    permission_classes = (permissions.IsAdminUser,)

    def partial_update(self, request, pk=None, **kwargs):
        if 'approval' not in request.data:
            print(request.data)
            error_message = '"approval" field required.'
            return response.Response(data={'error': error_message},
                                     status=status.HTTP_400_BAD_REQUEST)
        self.queryset.filter(pk=pk).update(approved=request.data['approval'])
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class ProjectApplicationViewset(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = projects_serializers.ProjectApplicationSerializer
    queryset = projects_models.ProjectApplication.objects.current_applications()
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    mapping = {
        'user': 'user',
        'semester': 'semester',
        'year': 'year',
        'firstChoice': 'first_choice',
        'secondChoice': 'second_choice',
        'thirdChoice': 'third_choice',
        'createdProject': 'created_project'
    }

    def create(self, request):
        data = request.data
        fields = {
            'user': request.user,
            'semester': data['semester'],
            'year': data['year']
        }
        fields['first_choice'] = projects_models.Project.objects.get(
            pk=data['firstChoice'])
        if 'secondChoice' in data:
            fields['second_choice'] = projects_models.Project.objects.get(
                pk=data['secondChoice'])
        if 'thirdChoice' in data:
            fields['third_choice'] = projects_models.Project.objects.get(
                pk=data['thirdChoice'])

        new_application = projects_models.ProjectApplication.objects.create(
            **fields)
        serializer = self.serializer_class(new_application)
        return response.Response(serializer.data)

    def update(self, request, pk=None):
        data = request.data
        fields_to_update = {}
        for key in self.mapping:
            if key in data:
                fields_to_update[self.mapping[key]] = data[key]
        self.queryset.filter(pk=pk).update(**fields_to_update)
        return response.Response(status=status.HTTP_204_NO_CONTENT)
