from django.conf.urls import url, include
from rest_framework import routers
from github import views as github_views

router = routers.DefaultRouter()
router.register(r'members', github_views.MemberViewSet)
router.register(r'repos', github_views.RepositoryViewSet)
router.register(r'teams', github_views.TeamViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
]