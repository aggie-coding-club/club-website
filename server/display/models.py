from django.db import models

# Create your models here.


class Member(models.Model):
    id = models.EmailField(primary_key=True)
    username = models.CharField(max_length=255)
    profile_pic_url = models.URLField()
    profile_url = models.URLField()


class Repo(models.Model):
    description = models.TextField(default='No description')
    language = models.CharField(max_length=255)
    repo_url = models.URLField()
    contributors = models.ManyToManyField(Member)


class Team(models.Model):
    members = models.ManyToManyField(Member)
    repos = models.ManyToManyField(Repo)
    description = models.TextField(default='No description')
    name = models.CharField(max_length=255, blank=False)
    team_url = models.URLField()
