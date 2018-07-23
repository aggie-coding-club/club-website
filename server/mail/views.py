from pprint import pprint

from django import http as django_http
from django.contrib.auth import models as auth_models
from rest_framework import authentication
from rest_framework import generics as rf_generics
from rest_framework import permissions
from rest_framework import response as rf_response

from mail import models as mail_models
from mail import serializers as mail_serializers

# Create your views here.


class CreateMailingGroup(rf_generics.CreateAPIView):
    """Creates a new MailingGroup"""

    def post(self, request, format=None):
        body = request.data
        name = body['name']
        emails = body['emails']
        mailing_group = mail_models.MailingGroup.objects.create(name=name)
        users = auth_models.User.objects.filter(email__in=emails).all()

        mailing_group.user_set.add(*users)
        return rf_response.Response(status=200)


class DestroyMailingGroup(rf_generics.DestroyAPIView):
    queryset = mail_models.MailingGroup.objects.all()
    lookup_url_kwarg = 'pk'


class UpdateMailingGroup(rf_generics.UpdateAPIView):
    """Adds new emails to a MailingGroup"""

    def put(self, request, pk=None, format=None):
        pk = self.kwargs['pk']
        emails = request.data['emails']

        mailing_group = mail_models.MailingGroup.objects.get(pk=pk)
        users = auth_models.User.objects.filter(email__in=emails).all()
        mailing_group.user_set.set(users)
        return django_http.JsonResponse(mail_serializers.MailingGroupSerializer(mailing_group).data)