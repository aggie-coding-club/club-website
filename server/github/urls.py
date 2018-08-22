from django.urls import include, path

from github import views as github_views

app_name = 'github'
# Create a router and register our viewsets with it.

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('connect/', github_views.GithubConnect.as_view(), name='connect')
]
