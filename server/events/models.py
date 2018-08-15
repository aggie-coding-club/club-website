from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import models as auth_models
from django.db import models

# Create your models here.
class Event(models.Model):
    """ A representation of an ACC event.

    Attributes:
        name = The name of the event.
        creator = The User who created the event.
        description = A brief description of the event.
        location = Where the event is located.
        start_datetime = The starting datetime for the event.
        end_datetime = The ending datetime for the event.
    """
    name = models.CharField(max_length=50, blank=False)
    creator = models.ForeignKey(auth_models.User, on_delete=models.deletion.PROTECT)
    description = models.TextField(max_length=255)
    location = models.CharField(max_length=255)
    start_datetime = models.DateTimeField(default=timezone.now())
    end_datetime = models.DateTimeField(default=timezone.now())

    @property
    def duration(self) -> timedelta:
        """ Returns the duration of an event.

        Args:
            event: The event to calculate the duration of.
        Returns:
            The difference between the starting and ending datetimes.
        """
        return self.end_datetime - self.start_datetime

class SponsoredMixin(models.Model):
    """ Additional information about an event sponsor.

        Attributes:
            group_name = What group is putting on the event.
            group_description = A brief description of the group putting on the event.
            homepage_url = The group's home URL
    """
    group_name = models.CharField(max_length=50)
    group_description = models.TextField(max_length=255)
    homepage_url = models.URLField

    class Meta:
        abstract = True    

class WorkshopMixin(models.Model):
    """ Additional information about a workshop event.

        Attributes:
            topic = The topic of the workshop.
            workshop_organizers = The users who will be organizing the workshop.
    """
    topic = models.CharField(max_length=50)
    workshop_organizers = models.ManyToManyField(auth_models.User)

    class Meta:
        abstract = True

class SponsoredEvent(Event, SponsoredMixin):
    """ A representation of a sponsored ACC event.
    """
    pass

class WorkshopEvent(Event, WorkshopMixin):
    """ A representation of an ACC workshop event.
    """
    pass

class SponsoredWorkshopEvent(Event, SponsoredMixin, WorkshopMixin):
    """ A representation of a sponsored ACC workshop event.
    """
    pass