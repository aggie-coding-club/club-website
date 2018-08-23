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
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.auth import urls as auth_urls
from django.urls import include, path
from django.views import generic as generic_views

from core import urls as core_urls
from github import urls as github_urls
from projects import urls as projects_urls

urlpatterns = [
    path('projects/', include(projects_urls)),
    path('github/', include(github_urls)),
    path('admin/', admin.site.urls),
    path('login/', auth_views.login),
    path('accounts/profile/', generic_views.TemplateView.as_view(
        template_name='accounts/profile.html'), name='profile'),
    path('accounts/', include(auth_urls)),
    path('', include('social_django.urls')),
    url('', include(core_urls))
]
