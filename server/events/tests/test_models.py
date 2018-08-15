import datetime

from django.utils import timezone
from django.contrib.auth import models as auth_models

from events.tests import shared_case

class EventTest(shared_case.SharedTestCase):
    """Tests the functionality of the Event model."""

    def test_event_duration(self):
        """Tests the duration property of Event model."""
        expected = datetime.timedelta(seconds=1800)
        actual = self.event1.duration

        self.assertEqual(expected, actual)