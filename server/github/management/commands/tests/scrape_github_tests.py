import io
import json

from django import test

from github.management.commands.scrape_github import (build_headers,
                                                      load_credentials, repository_fields, member_fields, team_fields)


class TestScrapeGithub(test.TestCase):

    def test_build_headers(self):
        fake_input = {
            'personal_access_token': 'gobbledegook',
            'username': 'fake_username',
            'bot_calendar_id': 'fake_id'
        }
        fake_json = json.dumps(fake_input)
        fake_file = io.StringIO(fake_json)
        credentials = load_credentials(fake_file)

        expected = {
            'Authorization': 'Bearer %s' % fake_input['personal_access_token']
        }
        headers = build_headers(credentials)
        self.assertDictEqual(expected, headers)

    def test_repository_fields(self):
        expected = '\n'.join([
            'description',
            'homepageUrl',
            'isPrivate',
            'name',
            'primaryLanguage { name }',
            'url'
        ])
        actual = repository_fields()
        self.assertEqual(expected, actual)

    def test_member_fields(self):
        expected = '\n'.join([
            'login',
            'avatarUrl',
            'bio',
            'company',
            'email',
            'name',
            'url'
        ])
        actual = member_fields()
        self.assertEqual(expected, actual)

    def test_member_fields_when_login_only(self):
        expected = 'login'
        actual = member_fields(login_only=True)
        self.assertEqual(expected, actual)