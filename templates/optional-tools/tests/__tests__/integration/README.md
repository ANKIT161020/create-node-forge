🔗 **tests**/integration/ - Integration Tests
This directory contains integration tests. These tests verify that different parts of your application (e.g., controllers, services, repositories, and the database) work correctly together as a cohesive system.

Purpose: To ensure that the various components and layers of your application integrate seamlessly and function as expected when combined, mimicking real-world usage.

What you'll find here:

Files named [domain].integration.test.ts (e.g., auth.integration.test.ts, user.integration.test.ts).

Tests that make actual HTTP requests to your Express application (using supertest).

Tests that interact with a dedicated test database.

Key Rules & Best Practices for **tests**/integration/:

Dedicated Test Database: Always use the MONGODB_URI_TEST for these tests. The setup.ts and teardown.ts files ensure a clean database state before and after each test run.

Realistic Scenarios: Design tests that simulate common user flows and API interactions end-to-end.

HTTP Assertions: Use supertest to make assertions about HTTP status codes, response bodies, and headers.

Slower Execution: Integration tests are inherently slower than unit tests because they involve external dependencies (like the database).

Error Path Testing: Ensure you test how your API responds to invalid inputs, unauthorized access, and other error conditions.
