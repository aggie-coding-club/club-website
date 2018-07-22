import json
import os

import requests
from django.core.management.base import BaseCommand, CommandError
from github import models as github_models

CREDENTIALS_PATH = os.path.abspath('/server/github/management/commands/config.json')
def load_credentials(self):
class Command(BaseCommand):

    def handle(self, *args, **options):
        """Scrapes GitHub data for member, team, and repository information."""
