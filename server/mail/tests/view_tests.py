import json

from django import urls as django_urls
from django.contrib.auth import models as auth_models
from django.test import TestCase
from rest_framework import test as rf_test
from rest_framework.authtoken import models as authtoken_models

from mail import models as mail_models


class TestViews(TestCase):

    @classmethod
    def setUp(self):
        self.superuser = auth_models.User.objects.create_superuser(
            username='johndoe', password='12345', email='johndoe@tamu.edu')
        self.user2 = auth_models.User.objects.create_user(
            username='janedoe', password='12345', email='janedoe@tamu.edu')

        self.mailing_group = mail_models.MailingGroup(name='new-group')
        self.mailing_group.save()
        self.mailing_group.user_set.add(self.superuser)

        self.superuser_token = authtoken_models.Token.objects.get(
            user=self.superuser)

    def login_superuser(self):
        self.client.login(username='johndoe', password='12345')
        token = authtoken_models.Token.objects.get(user=self.superuser)

        return {
            'HTTP_AUTHORIZATION': 'Token %s' % token
        }

    def test_create_mailing_group(self):
        headers = self.login_superuser()
        url = django_urls.reverse('mail:create_group')
        body = {
            'name': 'team-leads',
            'emails': ['johndoe@tamu.edu', 'janedoe@tamu.edu']
        }
        response = self.client.post(url, data=json.dumps(
            body), **headers, content_type='application/json')

        expected = body['emails']
        actual = mail_models.MailingGroup.objects.get(
            name=body['name']).email_list

        self.assertListEqual(expected, actual)

    def test_delete_mailing_group(self):
        headers = self.login_superuser()
        url = django_urls.reverse('mail:destroy_group', args=[
                                  self.mailing_group.pk])
        response = self.client.delete(url, **headers)
        expected = []
        actual = list(mail_models.MailingGroup.objects.filter(
            name='new-group').all())
        self.assertListEqual(expected, actual)

    def test_update_mailing_group(self):
        headers = self.login_superuser()
        url = django_urls.reverse('mail:update_group', args=[
                                  self.mailing_group.pk])
        body = {
            'emails': ['janedoe@tamu.edu']
        }
        response = self.client.put(url, data=json.dumps(
            body), **headers, content_type='application/json')

        expected = ['janedoe@tamu.edu']
        actual = self.mailing_group.email_list
        self.assertListEqual(expected, actual)

    def test_update_mailing_group_response(self):
        headers = self.login_superuser()
        url = django_urls.reverse('mail:update_group', args=[
                                  self.mailing_group.pk])
        body = {
            'emails': ['janedoe@tamu.edu']
        }
        response = self.client.put(url, data=json.dumps(
            body), **headers, content_type='application/json')

        expected = {
            'email_list': ['janedoe@tamu.edu'],
            'name': 'new-group'
        }

        content = json.loads(response.content)
        self.assertDictEqual(expected, content)

    def test_mail_mailing_group(self):
        headers = self.login_superuser()
        url = django_urls.reverse('mail:mail_group', args=[
                                  self.mailing_group.pk])

        body = {
            'body': 'body',
            'subject': 'subject'
        }
        response = self.client.post(url, data=json.dumps(
            body), **headers, content_type='application/json')
        response_body = json.loads(response.content)

        expected = {
            'emails_sent': 1
        }
        self.assertDictEqual(expected, response_body)
