import datetime

from django.utils import timezone
from django.test import testcases
from django.contrib.auth import models as auth_models

from events import models as event_models

class SharedTestCase(testcases.TestCase):
    """A sublcass of Django's TestCase that reduces the amount of rewriting needed for each test."""

    @classmethod
    def setUpUsers(cls):
        """Creates Users to be used as event creators."""
        cls.user1 = auth_models.User.objects.create_user(
            username='user1', email='dragonboi33@user1.com')
        cls.user2 = auth_models.User.objects.create_user(
            username='user2', email='remlover48@user2.com')

    @classmethod
    def setUpEvents(cls):
        """Creates Events to be used between TestCases."""
        cls.setUpUsers()

        start_datetime1 = timezone.now()
        end_datetime1 = start_datetime1 + datetime.timedelta(seconds=1800)

        cls.event1 = event_models.Event.objects.create(
                        name='event1',
                        creator=cls.user1,
                        description='description1',
                        location='location1',
                        start_datetime=start_datetime1,
                        end_datetime=end_datetime1)

    @classmethod
    def setUpTestData(cls):
        cls.setUpEvents()