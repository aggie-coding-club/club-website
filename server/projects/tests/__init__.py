from .models_tests import ProjectModelTests, ProjectApplicationModelTests
from .managers_tests import ProjectManagerTests, ProjectApplicationManagerTests
from .management_commands_tests import AssignMembersToTeamsTests
from .views_tests import ProjectViewsTests, ProjectApplicationViewsTests
__all__ = ['ProjectModelTests', 'ProjectApplicationModelTests', 'ProjectManagerTests',
           'ProjectApplicationManagerTests', 'AssignMembersToTeamsTests', 'ProjectViewsTests', 'ProjectApplicationViewsTests']
