from django.contrib import admin

from events import models as event_models

# Register your models here.
@admin.register(event_models.Event)
class EventAdmin(admin.ModelAdmin):
    pass

@admin.register(event_models.WorkshopEvent)
class WorkshopEventAdmin(admin.ModelAdmin):
    pass

@admin.register(event_models.SponsoredEvent)
class SponsoredEventAdmin(admin.ModelAdmin):
    pass

@admin.register(event_models.SponsoredWorkshopEvent)
class SponsoredWorkshopEventAdmin(admin.ModelAdmin):
    pass