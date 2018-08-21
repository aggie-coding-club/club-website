from django.urls import path
from django.conf.urls import url, include
from projects import views as projects_views
from django.contrib.admin.views.decorators import staff_member_required
app_name = 'projects'


urlpatterns = [
    path('applications/<int:pk>/', projects_views.ProjectApplicationDetail.as_view(),
        name='app-detail')
]
