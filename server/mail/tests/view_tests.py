import json

from django import urls as django_urls
from django.contrib.auth import models as auth_models
from mail import models as mail_models
from django.test import TestCase


class TestViews(TestCase):

    @classmethod
    def setUp(self):
        self.user = auth_models.User.objects.create_user(
            username='johndoe', password='12345', email='johndoe@tamu.edu')
        self.user2 = auth_models.User.objects.create_user(
            username='janedoe', password='123456', email='janedoe@tamu.edu')
        self.user3 = auth_models.User.objects.create_user(
            username='jimdoe', password='123', email=''
        )

    def test_create_mailing_group(self):
        url = django_urls.reverse('mail:create_group')
        body = {
            'name': 'new-group',
            'emails': ['johndoe@tamu.edu', 'janedoe@tamu.edu']
        }
        response = self.client.post(url, data=json.dumps(
            body), content_type='application/json')

        expected = mail_models.MailingGroup.objects.get(
            name=body['name']).email_list
        self.assertListEqual(expected, body['emails'])

    def test_delete_mailing_group(self):
        self.mailing_group = mail_models.MailingGroup(name='new-group')
        self.mailing_group.save()
        url = django_urls.reverse('mail:destroy_group', args=[
                                  self.mailing_group.pk])
        response = self.client.delete(url)
        expected = []
        actual = list(mail_models.MailingGroup.objects.filter(
            name='new-group').all())
        self.assertListEqual(expected, actual)

    def test_update_mailing_group(self):
        self.mailing_group = mail_models.MailingGroup(name='new-group')
        self.mailing_group.save()
        self.mailing_group.user_set.add(self.user)
        url = django_urls.reverse('mail:update_group', args=[
                                  self.mailing_group.pk])
        body = {
            'emails': ['janedoe@tamu.edu']
        }
        response = self.client.put(url, data=json.dumps(
            body), content_type='application/json')

        expected = ['janedoe@tamu.edu']
        actual = self.mailing_group.email_list
        self.assertListEqual(expected, actual)

    def test_update_mailing_group_response(self):
        self.mailing_group = mail_models.MailingGroup(name='new-group')
        self.mailing_group.save()
        self.mailing_group.user_set.add(self.user)
        url = django_urls.reverse('mail:update_group', args=[
                                  self.mailing_group.pk])
        body = {
            'emails': ['janedoe@tamu.edu']
        }
        response = self.client.put(url, data=json.dumps(
            body), content_type='application/json')

        expected = {
            'email_list': ['janedoe@tamu.edu'],
            'name': 'new-group'
        }

        content = json.loads(response.content)
        self.assertDictEqual(expected, content)
