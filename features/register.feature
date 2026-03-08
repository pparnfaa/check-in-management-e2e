Feature: Teacher register
  Scenario: Open register page, fill information, and submit
    Given the teacher is on login page
    When the teacher clicks the element with test id "register-teacher-link"
    Then the element with test id "teacher-code-input" should be visible
    When the teacher fills the following register information:
      | testId                      | value               |
      | teacher-code-input          | ONLYTEACHERCANREGISTER                |
      | name-input                  | Test Teacher         |
      | email-input                 | teacher@test.com |
      | password-input              | Pass@1234           |
      | password-confirmation-input | Pass@1234           |
    And the teacher clicks the element with test id "terms-checkbox"
    And the teacher submits register form with test id "create-account-btn"
    Then the teacher should be on "courses" page
    And the test run completes and closes browser
