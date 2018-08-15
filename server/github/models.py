from django.conf import settings
from django.contrib.auth import models as auth_models
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token


class Repository(models.Model):
    """A representation of a GitHub repository.

    Attributes:
      description: The description of this repository.
      homepage_url: If applicable, the homepage url where this project can be seen in action.
      is_private: Whether or not this repository is private.
      name: The name of this repository.
      primary_language: The primary language of this repository.
      url: The GitHub URL of this repository.
    """
    description = models.TextField(null=True, blank=True)
    homepage_url = models.URLField(null=True, blank=True)
    is_private = models.BooleanField()
    name = models.CharField(max_length=100, primary_key=True)
    primary_language = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = _('Repositories')


class Team(models.Model):
    """A representation of a GitHub team.

    Attributes:
    """
    avatar_url = models.URLField()
    combined_slug = models.SlugField(max_length=100)
    description = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=100)
    parent_team = models.ForeignKey(
        'Team', related_name='child_team', on_delete=models.CASCADE, null=True, blank=True)
    url = models.URLField()

    def __str__(self):
        return str(self.combined_slug)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class GithubUser(models.Model):
    """A representation of a GitHub user.

    Attributes:
      avatar_url: The URL pointing to this user's profile icon.
      bio: This user's GitHub bio.
      company: The company that this user works for.
      email: The publicly-available email that this user has listed.
      name: This user's name.
      url: The URL needed to reach this user's account on GitHub.
      login: The user's username.

    Relations:
      teams: The teams that this user belongs to.
      repositories: The repositories that this user contributes to.
    """
    avatar_url = models.URLField()
    bio = models.TextField(null=True, blank=True)
    company = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    login = models.CharField(max_length=100, primary_key=True)
    user = models.OneToOneField(
        auth_models.User, on_delete=models.CASCADE, null=True, blank=True)

    teams = models.ManyToManyField(Team, related_name='members')
    repositories = models.ManyToManyField(
        Repository, related_name='contributors')

    def __str__(self):
        return str(self.login)
