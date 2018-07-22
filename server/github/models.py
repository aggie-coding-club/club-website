from django.db import models

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
        return self.name.to_python()

class Team(models.Model):
    """A representation of a GitHub team.

    Attributes:
    """
    avatar_url = models.URLField()
    combined_slug = models.SlugField(max_length=100)
    description = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=100)
    parent_team = models.ForeignKey('Team', related_name='child_team')
    url = models.URLField()

    def __str__(self):
        return str(self.combined_slug.to_python())

class Member(models.Model):
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
    login = models.CharField(max_length=100, null=True, blank=True)

    teams = models.ManyToManyField(Team, related_name='members')
    repositories = models.ManyToManyField(Repository, related_name='contributors')

    def __str__(self):
        return self.login.to_python()