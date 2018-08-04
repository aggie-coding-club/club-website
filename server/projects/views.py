from django.contrib.auth import models as auth_models
from rest_framework import generics, mixins, response, status, views, viewsets
from rest_framework import permissions
from projects import models as projects_models
from projects import serializers as projects_serializers

# Create your views here.


class IsAuthenticatedAndOwner(permissions.BasePermission):
    message = 'You must be the owner of this object.'

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class ProjectViewset(viewsets.ModelViewSet):

    serializer_class = projects_serializers.ProjectSerializer
    queryset = projects_models.Project.objects.all()

    def create(self, request):
        data = request.data
        fields = {
            'name': data['name'],
            'description': data['description'],
            'ideal_capacity': data['ideal_capacity'],
            'approved': False
        }
        if 'project_lead' in data:
            fields['project_lead'] = data['project_lead']
        if 'members' in data:
            fields['members'] = data['members']

        instance = projects_models.Project.objects.create(**fields)
        serializer = self.serializer_class(instance)
        return response.Response(serializer.data)


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


class ProjectApplicationViewset(viewsets.ModelViewSet):
    """Handles creating, updating, partially-updating, deleting, retrieving, and destroying project applications.

    POST - Creates a new ProjectApplication. Must be authenticated.

    PUT - Replaces an existing ProjectApplication with existing data. Must be the owner of the ProjectApplication

    PATCH - Updates parts of a ProjectApplication with new data. Must be the owner of the ProjectApplication.

    DELETE - Deletes a ProjectApplication. Must be the owner of the ProjectApplication.
    """

    serializer_class = projects_serializers.ProjectApplicationSerializer
    queryset = projects_models.ProjectApplication.objects.current_applications()
    permission_classes_by_action = {
        'default': (permissions.IsAuthenticated,),
        'list': (permissions.IsAdminUser,),
        'retrieve': (IsAuthenticatedAndOwner,),
        'destroy': (IsAuthenticatedAndOwner,),
        'update': (IsAuthenticatedAndOwner,),
        'partial_update': (IsAuthenticatedAndOwner,)
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes_by_action['default']]

    def create(self, request):
        data = request.data
        fields = {
            'user': request.user,
            'semester': data['semester'],
            'year': data['year']
        }
        fields['first_choice'] = projects_models.Project.objects.get(
            pk=data['first_choice'])
        if 'second_choice' in data:
            fields['second_choice'] = projects_models.Project.objects.get(
                pk=data['second_choice'])
        if 'third_choice' in data:
            fields['third_choice'] = projects_models.Project.objects.get(
                pk=data['third_choice'])
        new_application = projects_models.ProjectApplication.objects.create(
            **fields)
        serializer = self.serializer_class(new_application)
        return response.Response(serializer.data)
