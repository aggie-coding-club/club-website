from django.urls import path
from django.conf.urls import url, include
from projects import views as projects_views
from django.contrib.admin.views.decorators import staff_member_required
app_name = 'projects'


urlpatterns = [
    path('applications/create',
         projects_views.ProjectApplicationCreate.as_view(), name='app-create'),
    path('applications/<int:pk>/',
         projects_views.ProjectApplicationUpdate.as_view(), name='app-update'),
    path('applications/',
         projects_views.ProjectApplicationRedirect.as_view(), name='app'),
    path('<int:pk>/', projects_views.ProjectDetail.as_view(), name='project-detail'),
    path('', projects_views.ProjectCreate.as_view(), name='project-create'),
]
