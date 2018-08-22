"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.contrib.auth import views as auth_views
from django.urls import include, path
from django.conf.urls import url, include
from django.views import generic as generic_views
from projects import urls as projects_urls

from github import urls as github_urls

urlpatterns = [
    path('projects/', include(projects_urls)),
    path('github/', include(github_urls)),
    path('admin/', admin.site.urls),
    path('login/', auth_views.login),
    path('accounts/profile/', generic_views.TemplateView.as_view(
        template_name='accounts/profile.html'), name='profile'),
    path('', include('social_django.urls'))
]
