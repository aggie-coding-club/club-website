from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from github import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', views.GithubUserViewSet)
router.register(r'repositories', views.RepositoryViewSet)
router.register(r'teams', views.TeamViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    url(r'^', include(router.urls))
]
