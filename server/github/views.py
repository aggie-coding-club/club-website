from django import forms, views
from github import models as github_models
from github.management.commands import scrape_github as github_scraper
from django.core import exceptions as django_exceptions
# Create your views here.


class GithubForm(forms.Form):
    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(GithubForm, self).__init__(*args, **kwargs)

    username = forms.CharField(max_length=255, strip=True)

    def clean_username(self):
        data = self.cleaned_data['username']
        try:
            if self.user.githubuser:
                raise forms.ValidationError(
                    "You've already connected your account.")
        except django_exceptions.ObjectDoesNotExist:
            return data

    def lookup_username(self):
        try:
            return github_models.GithubUser.objects.get(login=self.cleaned_data['username'])
        except github_models.GithubUser.DoesNotExist:
            body = """
            query {
                user(login:%s) {
                    login
                    avatarUrl
                    bio
                    company
                    email
                    url
                    name
                }
            }
            """ % self.cleaned_data['username']
            try:
                member_dict = github_scraper.post_graphql(
                    body, headers=github_scraper.HEADERS)['user']
                return github_scraper.save_member(member_dict)
            except github_scraper.GraphQLException:
                return None


class GithubConnect(views.generic.FormView):
    form_class = GithubForm
    template_name = 'connect.html'
    success_url = '/accounts/profile'

    def get_form(self):
        return self.form_class(self.request.POST, user=self.request.user)

    def form_valid(self, form):
        github_user = form.lookup_username()
        if github_user:
            github_user.user = self.request.user
            github_user.save()
            return super(GithubConnect, self).form_valid(form)
        else:
            form.add_error('username', forms.ValidationError(
                'This Github user does not exist.'))
            return super(GithubConnect, self).form_invalid(form)
