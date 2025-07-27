🧪 **tests**/ - Application Tests
This directory is where all your automated tests live. A strong testing suite is vital for ensuring your code works as expected, preventing bugs, and allowing you to make changes confidently.

Purpose: To verify the correctness and functionality of your application's code at different levels of granularity (unit and integration).

What you'll find here:

unit/ subdirectory for unit tests.

integration/ subdirectory for API integration tests.

Global test setup (setup.ts) and teardown (teardown.ts) files.

Key Rules & Best Practices for **tests**/:

Test Isolation: Each test should be independent. Use beforeEach to reset data or state (e.g., clearing database collections) to prevent tests from affecting each other.

Clear Naming: Name test files and test blocks clearly to indicate what they are testing (e.g., auth.integration.test.ts, password.test.ts).

Arrange-Act-Assert (AAA): Structure your tests using the AAA pattern:

Arrange: Set up any necessary test data or environment.

Act: Perform the action you are testing (e.g., call a function, make an API request).

Assert: Verify that the outcome is as expected.

Dedicated Test Database: Always use a separate database for integration tests (MONGODB_URI_TEST) to prevent data corruption in your development or production databases.

Meaningful Assertions: Use Jest's matchers (expect().toBe(), expect().toHaveBeenCalled()) to make your assertions clear and specific.
