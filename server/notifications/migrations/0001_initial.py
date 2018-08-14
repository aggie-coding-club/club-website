# Generated by Django 2.0.4 on 2018-08-13 17:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('attachment', models.FileField(null=True, upload_to='')),
                ('subject', models.CharField(max_length=255)),
                ('recipients', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('sending_user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='email_notifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SlackEmailNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('attachment', models.FileField(null=True, upload_to='')),
                ('channel', models.CharField(choices=[('#announcements', '#announcements'), ('#general', '#general')], max_length=20)),
                ('notify_channel', models.BooleanField(default=False)),
                ('subject', models.CharField(max_length=255)),
                ('recipients', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('sending_user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='slack_email_notifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SlackNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('attachment', models.FileField(null=True, upload_to='')),
                ('channel', models.CharField(choices=[('#announcements', '#announcements'), ('#general', '#general')], max_length=20)),
                ('notify_channel', models.BooleanField(default=False)),
                ('sending_user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='slack_notifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]