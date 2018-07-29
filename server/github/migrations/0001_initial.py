# Generated by Django 2.0.7 on 2018-07-29 21:18

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
            name='GithubUser',
            fields=[
                ('avatar_url', models.URLField()),
                ('bio', models.TextField(blank=True, null=True)),
                ('company', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('url', models.URLField(blank=True, null=True)),
                ('login', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Repository',
            fields=[
                ('description', models.TextField(blank=True, null=True)),
                ('homepage_url', models.URLField(blank=True, null=True)),
                ('is_private', models.BooleanField()),
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('primary_language', models.CharField(blank=True, max_length=100, null=True)),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar_url', models.URLField()),
                ('combined_slug', models.SlugField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('name', models.CharField(max_length=100)),
                ('url', models.URLField()),
                ('parent_team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='child_team', to='github.Team')),
            ],
        ),
        migrations.AddField(
            model_name='githubuser',
            name='repositories',
            field=models.ManyToManyField(related_name='contributors', to='github.Repository'),
        ),
        migrations.AddField(
            model_name='githubuser',
            name='teams',
            field=models.ManyToManyField(related_name='members', to='github.Team'),
        ),
        migrations.AddField(
            model_name='githubuser',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
