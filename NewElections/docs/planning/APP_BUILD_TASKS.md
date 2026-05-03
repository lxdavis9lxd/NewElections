# Elections IRV App Build Task List

## Review Summary

- Scaffold status: basic React shell with a single Home route, shared UI components, Express server with health and password utility routes, and Vite proxy from `/api` to server.
- PRD status: 15 requirements covering role-based auth, local user management, election participation and history, IRV winner logic, realtime updates, performance, security, graceful failures, and responsive UX.
- API status: only election domain is remote API-backed (`/info`, `/elections`, `/elections/:election_id`, ballots endpoints). User accounts, auth, assignments, and recovery must be local to this app.
- API constraints to design for: bearer auth header, 10 req/sec soft limit, pagination by `after`, random API failures including 5xx/555 behavior, JSON-only payloads, epoch millisecond timestamps.

## Dependency-Ordered Tasks

1. T01: Create environment config contract (API base URL, bearer token, cookie/session secrets, app mode). Depends on: none.
2. T02: Implement secure config loader and startup validation for server/client env vars. Depends on: T01.
3. T03: Design local SQLite schema for users, credentials, sessions, failed logins, password reset tokens, election assignments, and audit events. Depends on: T02.
4. T04: Implement DB migrations + deterministic seed including required super administrator account. Depends on: T03.
5. T05: Build shared server domain models and validation schemas (user, role, assignment, election DTO adapters). Depends on: T04.
6. T06: Implement local auth core (hashed passwords, login/logout, remember-me, lockout after 3 failed attempts for 1 hour). Depends on: T05.
7. T07: Build auth/session middleware and route guards for role-based access control. Depends on: T06.
8. T08: Implement admin-only local user CRUD (create/update/delete/view, uniqueness checks, role constraints, super-admin special rules). Depends on: T07.
9. T09: Implement moderator/admin assignment management for voters-to-elections and moderators-to-elections in local DB. Depends on: T08.
10. T10: Implement password policy and strength UI contract (weak/moderate/strong) plus CAPTCHA verification service. Depends on: T06.
11. T11: Implement forgot-password and reset flow with simulated email transport and expiring reset tokens. Depends on: T06.
12. T12: Build API integration client with retry/backoff, rate-limit protection, standardized error mapping, and auth header injection. Depends on: T02.
13. T13: Implement election metadata ingestion (`GET /info`, `GET /elections` with pagination) and server cache layer. Depends on: T12.
14. T14: Implement owned-election lifecycle operations (`POST`, `PATCH`, `DELETE`) with immutable closed-election enforcement and super-admin exceptions. Depends on: T13.
15. T15: Implement ballot operations (`GET/PUT/DELETE ballots`) with voter eligibility checks against local assignments. Depends on: T09, T13.
16. T16: Implement IRV calculation engine with deterministic tie-break handling and invalid ballot normalization strategy. Depends on: T15.
17. T17: Build frontend auth pages (login/logout, remember-me, force password change on first login). Depends on: T06, T07, T10.
18. T18: Build global app shell/navigation with BDPA branding and live election counters. Depends on: T13, T17.
19. T19: Build role-aware route map and protected navigation states for voter/moderator/administrator/reporter. Depends on: T17, T18.
20. T20: Build voter election view with rank-all-options ballot editor, submit/update/delete vote, and closed-state rendering rules. Depends on: T15, T16, T19.
21. T21: Build administrator election management UI (create/edit/delete/view with owned vs unowned behavior and immutability messaging). Depends on: T14, T19.
22. T22: Build moderator dashboard tools to manage voter assignments for assigned elections only. Depends on: T09, T19.
23. T23: Build administrator dashboard tools for user management and global assignments. Depends on: T08, T09, T19.
24. T24: Build reporter dashboard with recent closed elections and history deep-link. Depends on: T13, T19.
25. T25: Build full history view with sorting options, pagination, and role-based deleted election visibility. Depends on: T13, T16, T19.
26. T26: Implement realtime update strategy (polling/revalidation schedule + visibility/focus refresh) for election state and winner updates. Depends on: T20, T25.
27. T27: Add graceful-failure UX states (loaders, empty states, toast/errors, retry actions, no blank-screen paths). Depends on: T20, T25, T26.
28. T28: Apply security hardening (input sanitization, output encoding rules, auth cookie flags, SQL injection protections, audit trails). Depends on: T08, T11, T12.
29. T29: Add performance layer (cache invalidation, memoized selectors, request dedupe, batched UI updates). Depends on: T25, T26.
30. T30: Add responsive/mobile-first QA pass across all views and breakpoints. Depends on: T18, T20, T21, T22, T23, T24, T25.
31. T31: Add integration tests for auth + role guards + assignment constraints. Depends on: T23, T28.
32. T32: Add integration tests for elections, ballots, IRV outputs, and history sorting/pagination. Depends on: T25, T29.
33. T33: Add chaos/error tests for API 429/5xx/555 and malformed payload handling. Depends on: T27, T29.
34. T34: Production runbook and final deployment checklist for localhost:3000 scoring environment. Depends on: T30, T31, T32, T33.

## Critical Sequencing Notes

- No feature UI should start before T17-T19 are complete, because all views are authenticated and role-gated.
- No election/ballot mutation should start before T12-T15 are complete, because API-backed state and local eligibility checks are coupled.
- No final performance tuning should start before T25 and T26, because the bottlenecks depend on final list/election behavior.
- No acceptance testing should start before T27-T30, because failure and responsive behavior are judged requirements.
