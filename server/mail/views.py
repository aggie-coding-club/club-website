from django import http as django_http
from django.contrib.auth import mixins as auth_mixins
from django.contrib.auth import models as auth_models
from rest_framework import authentication as rf_auth
from rest_framework import generics as rf_generics
from rest_framework import permissions as rf_permissions
from rest_framework import response as rf_response

from mail import models as mail_models
from mail import serializers as mail_serializers

# Create your views here.


def is_superuser(self):
    return self.request.user.is_superuser


class CreateMailingGroup(auth_mixins.UserPassesTestMixin, rf_generics.CreateAPIView):
    """Creates a new MailingGroup"""
    authentication_classes = (rf_auth.TokenAuthentication,)
    permission_classes = (rf_permissions.IsAuthenticated,)
    test_func = is_superuser

    def post(self, request, format=None):
        body = request.data
        name = body['name']
        emails = body['emails']
        mailing_group = mail_models.MailingGroup.objects.create(name=name)
        users = auth_models.User.objects.filter(email__in=emails).all()
        mailing_group.user_set.add(*users)
        return rf_response.Response(status=200)


class DestroyMailingGroup(auth_mixins.UserPassesTestMixin, rf_generics.DestroyAPIView):

    test_func = is_superuser
    authentication_classes = (rf_auth.TokenAuthentication,)
    permission_classes = (rf_permissions.IsAuthenticated,)
    queryset = mail_models.MailingGroup.objects.all()
    lookup_url_kwarg = 'pk'


class UpdateMailingGroup(rf_generics.UpdateAPIView):
    """Adds new emails to a MailingGroup"""

    test_func = is_superuser
    authentication_classes = (rf_auth.TokenAuthentication,)
    permission_classes = (rf_permissions.IsAuthenticated,)

    def put(self, request, **kwargs):
        emails = request.data['emails']
        pk = self.kwargs['pk']

        mailing_group = mail_models.MailingGroup.objects.get(pk=pk)
        users = auth_models.User.objects.filter(email__in=emails).all()
        mailing_group.user_set.set(users)
        serializer = mail_serializers.MailingGroupSerializer(mailing_group)

        return django_http.JsonResponse(serializer.data)


class SendMailToMailingGroup(rf_generics.CreateAPIView):
    """Sends an email to a mailing group."""

    authentication_classes = (rf_auth.TokenAuthentication,)
    permission_classes = (rf_permissions.IsAuthenticated,)

    def post(self, request, **kwargs):
        user = request.user
        data = request.data
        pk = self.kwargs['pk']
        mailing_group = mail_models.MailingGroup.objects.get(pk=pk)
        subject = data['subject']
        body = data['body']
        emails_sent = mailing_group.send_mail(
            subject, body, request.user.email)
        return django_http.JsonResponse({'emails_sent': emails_sent})
