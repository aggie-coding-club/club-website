from django import shortcuts
from rest_framework import permissions, renderers, response, views, generics, mixins
from django import shortcuts
from projects import models as project_models
from projects import serializers as project_serializers


class ProjectApplicationDetail(views.APIView):
    renderer_classes = [renderers.TemplateHTMLRenderer]
    template_name = 'projects/projectapplication_detail_form.html'

    def get(self, request, pk):
        project_application = shortcuts.get_object_or_404(
            project_models.ProjectApplication, pk=pk)
        serializer = project_serializers.ProjectApplicationSerializer(
            project_application)
        return response.Response({'serializer': serializer, 'application': project_application})

    def patch(self, request, pk):
        project_application = shortcuts.get_object_or_404(
            project_models.ProjectApplication, pk=pk)
        serializer = project_serializers.ProjectApplicationSerializer(
            project_application, data=request.data)
        if not serializer.is_valid():
            return response.Response({'serializer': serializer, 'application': project_application})
        serializer.save()
        return response.Response(status=200)


class ProjectApplicationCreate(generics.GenericAPIView, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    renderer_classes = [renderers.TemplateHTMLRenderer]
    template_name = 'projects/projectapplication_create_form.html'

    def get(self, request):
        serializer = project_serializers.ProjectApplicationSerializer()
        return response.Response({'serializer': serializer})
    
    def post(self, request):
        serializer = project_serializers.ProjectApplicationSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response({'serializer': serializer})
        serializer.save()
        shortcuts.redirect('projects:project-applications-retrieve', args={'pk': serializer.data.pk})

    def delete(self, request, pk):
        project_models.ProjectApplication.objects.delete(pk=pk)
        shortcuts.redirect('settings.LOGIN_REDIRECT_URL')
    
