from django.conf.urls import url, include
from mail import views as mail_views

app_name = 'mail'
# The API URLs are now determined automatically by the router.
urlpatterns = [
    url(r'^groups/$', mail_views.CreateMailingGroup.as_view(), name='create_group'),
    url(r'^groups/(?P<pk>[0-9]+)/users/$', mail_views.UpdateMailingGroup.as_view(), name='update_group'),
    url(r'^groups/(?P<pk>[0-9]+)/$', mail_views.DestroyMailingGroup.as_view(), name='destroy_group'),
]
