🔬 **tests**/unit/ - Unit Tests
This directory contains unit tests. Unit tests focus on testing the smallest, most isolated parts of your code (like a single function or a class method) without involving external dependencies.

Purpose: To quickly verify the correctness of individual code units in isolation, ensuring they perform their intended logic accurately.

What you'll find here:

Files named [module].test.ts (e.g., password.test.ts, pick.test.ts).

Tests for utility functions, pure functions, or individual methods of classes (like services or repositories, but with their dependencies mocked).

Key Rules & Best Practices for **tests**/unit/:

True Isolation: Unit tests should never interact with databases, file systems, external APIs, or the network. Use mocking libraries (Jest has excellent built-in mocking) to simulate these dependencies.

Fast Execution: Unit tests should run extremely quickly, allowing you to get immediate feedback as you write code.

Single Focus: Each test case should focus on a single unit and test one specific behavior or scenario.

Deterministic: Unit tests must produce the same result every time they are run, regardless of the environment.
