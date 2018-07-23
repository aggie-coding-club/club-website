from rest_framework import serializers as rf_serializers
from mail import models as mail_models

class MailingGroupSerializer(rf_serializers.ModelSerializer):
    class Meta:
        model = mail_models.MailingGroup
        fields = ('email_list', 'name')