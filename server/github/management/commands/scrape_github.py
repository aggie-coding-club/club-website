import json
import os

import requests
from django.core.management.base import BaseCommand, CommandError
from github import models as github_models


class Command(BaseCommand):
    
    def handle(self, *args, **options):
        """Scrapes GitHub data for member, team, and repository information."""
        