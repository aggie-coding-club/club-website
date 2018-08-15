from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import models as auth_models
from .shared_case import SharedTestCase
from events.models import Event

class EventTest(SharedTestCase):
    """ Test module for Event model """

    def setUp(self):
        # event1
        Event.objects.create(
            name='event1',
            creator=self.user1,
            description='this is the description for event 1',
            location='place1',
            start_datetime=self.start_datetime1,
            end_datetime=self.end_datetime1)
        # event2
        Event.objects.create(
            name='event2',
            creator=self.user2,
            description='this is the description for event 2',
            location='place2',
            start_datetime=self.start_datetime2,
            end_datetime=self.end_datetime2)

    def test_event_duration(self):
        # test event1 duration
        expected = self.duration1
        actual = Event.objects.get(name='event1').duration
        self.assertEqual(expected,actual)
        # test event2 duration
        expected = self.duration2
        actual = Event.objects.get(name='event2').duration
        self.assertEqual(expected,actual)