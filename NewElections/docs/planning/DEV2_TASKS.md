# Dev2 Assignment

## Ownership Focus

- Remote elections API integration, caching, IRV core, and reliability/performance backend behavior.

## Assigned Tasks

1. T12 API integration client (retry/backoff/rate protection/error mapping).
2. T13 metadata ingestion and pagination cache.
3. T14 election lifecycle operations with immutability constraints.
4. T15 ballots API operations with eligibility guard hooks.
5. T16 IRV engine and winner resolution logic.
6. T26 realtime revalidation backend support contract.
7. T29 performance optimization layer.
8. T32 elections and IRV integration tests.
9. T33 chaos/error-path tests for API failures.

## External Dependencies You Need

- T02 and T05 from Dev1 before T12.
- T09 from Dev3 before T15 voter-eligibility enforcement is complete.
- T20 and T25 from Dev4 before tuning T26/T29 behavior under real UI load.

## Tasks Other Developers Depend On

- Dev4 needs T13/T15/T16 before election and history UI completion.
- Dev3 needs T14 for administrator election management screens.
- Dev1 needs T12 for complete security hardening/test coverage.
