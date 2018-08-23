import os

from django.shortcuts import render
from django.views import generic as generic_views

from github import models as github_models
from server import settings

# Create your views here.


class IndexView(generic_views.TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        repositories = github_models.Repository.objects.all()
        context['repos'] = repositories
        context['LOGIN_REDIRECT_URL'] = '/accounts/profile'

        relative_static_path = settings.STATIC_URL[1:]
        officer_photo_path = os.path.join(
            'server', relative_static_path, 'officers')
        officer_photos = os.listdir(officer_photo_path)
        context['officer_photos'] = officer_photos
        return context
