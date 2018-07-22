from django.db import models

class Repository(models.Model):
    """A representation of a GitHub repository."""
    description = models.TextField(null=True, blank=True)
    is_private = models.BooleanField()
    primary_language = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100, primary_key=True)
    homepage_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    """A representationof a GitHub team."""
    avatar_url = models.URLField(null=True, blank=True)
    combined_slug = models.SlugField()
    description = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return str(self.combined_slug)

class Member(models.Model):
    """A representation of a GitHub member."""
    avatar_url = models.URLField()
    company = models.CharField(max_length=100, null=True, blank=True)
    login = models.CharField(max_length=100, primary_key=True)
    url = models.URLField()
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, default=True)
    repositories = models.ManyToManyField(Repository, related_name='contributors')
    teams = models.ManyToManyField(Team, related_name='members')

    def __str__(self):
        return str(self.name)