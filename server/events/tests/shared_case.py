from datetime import timedelta
from django.utils import timezone
from django.test import TestCase
from django.contrib.auth import models as auth_models

class SharedTestCase(TestCase):
    """ A base test module that sets up dummy variables for testing. """

    @classmethod
    def setUpTestData(self):
        # users
        self.user1 = auth_models.User.objects.create_user(
            username = 'user1', email='dragonboi33@user1.com')
        self.user2 = auth_models.User.objects.create_user(
            username = 'user2', email='remlover48@user2.com')

        # event1 start/end times
        self.start_datetime1 = timezone.now()
        self.end_datetime1 = self.start_datetime1 + timedelta(seconds=1800)
        self.duration1 = timedelta(seconds=1800)
        # event2 start/end times
        self.start_datetime2 = timezone.now() + timedelta(seconds=1800)
        self.end_datetime2 = self.start_datetime2 + timedelta(seconds=3600)
        self.duration2 = timedelta(seconds=3600)