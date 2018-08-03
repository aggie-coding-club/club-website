from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from projects import views as projects_views
from django.contrib.admin.views.decorators import staff_member_required
app_name = 'projects'

router = routers.DefaultRouter()
router.register(r'projects', projects_views.ProjectViewset, 'projects')
router.register(r'project-applications', projects_views.ProjectApplicationViewset, 'project-apps')
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^(?P<pk>[^\/]+)/approval/$', projects_views.ModifyProjectApproval.as_view(), name='modify-approval')
]
