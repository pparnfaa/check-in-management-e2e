Feature: Homepage smoke
  As a QA engineer
  I want to verify homepage is reachable
  So that I can trust the app is up

  Scenario: Open homepage and verify title is visible
    Given I open the homepage
    Then the page title should not be empty
