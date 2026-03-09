Feature: Teacher E2E Flow
  Complete end-to-end flow for teacher: registration, login, and course management
  
  Scenario: Register teacher, login, and create/manage course
    Given the teacher is on login page
    When the teacher clicks the element with test id "register-teacher-link"
    Then the element with test id "teacher-code-input" should be visible
    When the teacher fills the following register information:
      | testId                      | value                  |
      | teacher-code-input          | ONLYTEACHERCANREGISTER |
      | name-input                  | Test Teacher           |
      | email-input                 | teacher@test.com       |
      | password-input              | Pass@1234              |
      | password-confirmation-input | Pass@1234              |
    And the teacher clicks the element with test id "terms-checkbox"
    And the teacher submits register form with test id "create-account-btn"
    Then the teacher should be on "courses" page
    When the teacher creates course if not exists:
      | testId                  | value       |
      | course-code-input       | CS101       |
      | course-name-input       | Intro to CS |
      | course-year-input       | 2026        |
      | course-semester-select  | 1           |
    Then the element with test id "course-summary-card" should be visible
    When the teacher creates session if not exists with title "First Session":
    Then the element with test id "qr-code-section" in qr section should be visible
