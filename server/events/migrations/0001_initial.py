# Generated by Django 2.0.4 on 2018-08-15 00:51

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('start_datetime', models.DateTimeField(default=datetime.datetime(2018, 8, 15, 0, 51, 19, 605669, tzinfo=utc))),
                ('end_datetime', models.DateTimeField(default=datetime.datetime(2018, 8, 15, 0, 51, 19, 605732, tzinfo=utc))),
            ],
        ),
        migrations.CreateModel(
            name='SponsoredEvent',
            fields=[
                ('event_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='events.Event')),
                ('group_name', models.CharField(max_length=50)),
                ('group_description', models.TextField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
            bases=('events.event', models.Model),
        ),
        migrations.CreateModel(
            name='SponsoredWorkshopEvent',
            fields=[
                ('event_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='events.Event')),
                ('group_name', models.CharField(max_length=50)),
                ('group_description', models.TextField(max_length=255)),
                ('topic', models.CharField(max_length=50)),
                ('workshop_organizers', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=('events.event', models.Model),
        ),
        migrations.CreateModel(
            name='WorkshopEvent',
            fields=[
                ('event_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='events.Event')),
                ('topic', models.CharField(max_length=50)),
                ('workshop_organizers', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=('events.event', models.Model),
        ),
        migrations.AddField(
            model_name='event',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]