from django.test import TestCase
from django.contrib.auth import models as auth_models
from mail import models as mail_models
# Create your tests here.


class TestMailingGroup(TestCase):

    @classmethod
    def setUp(self):
        self.user = auth_models.User.objects.create_user(
            username='johndoe', password='12345', email='johndoe@tamu.edu')
        self.user2 = auth_models.User.objects.create_user(
            username='janedoe', password='123456', email='janedoe@tamu.edu')
        self.user3 = auth_models.User.objects.create_user(
            username='jimdoe', password='123', email=''
        )
        self.mailing_group = mail_models.MailingGroup.objects.create(
            name='test-group')
        self.mailing_group.user_set.add(*[self.user, self.user2])

    def test_email_list(self):
        expected = ['johndoe@tamu.edu', 'janedoe@tamu.edu']
        self.assertListEqual(expected, self.mailing_group.email_list)
    
    def test_email_list_valid_email(self):
        expected = ['johndoe@tamu.edu', 'janedoe@tamu.edu']
        self.mailing_group.user_set.add(self.user3)
        self.assertListEqual(expected, self.mailing_group.email_list)

    def test_sends_email_successfully(self):
        email_fields = ('Subject', 'Body of email', 'aggiecodingclub@gmail.com')
        successful_emails = self.mailing_group.send_mail(*email_fields)
        self.assertEqual(1, successful_emails)