# Dev3 Assignment

## Ownership Focus

- Role-based operations and dashboards for administrators and moderators.

## Assigned Tasks

1. T09 voter/moderator assignment management services.
2. T21 administrator election management UI.
3. T22 moderator dashboard and assignment tools.
4. T23 administrator dashboard for users and assignments.
5. T24 reporter dashboard and history handoff path.

## External Dependencies You Need

- T07 and T08 from Dev1 before T21-T23 can enforce role constraints.
- T13 and T14 from Dev2 before T21 can manage elections correctly.
- T19 from Dev4 before dashboard routing and role navigation are final.

## Tasks Other Developers Depend On

- Dev2 depends on T09 to enforce ballot eligibility in T15.
- Dev1 depends on T23 for complete admin-flow integration tests (T31).
- Dev4 depends on T22/T23/T24 to complete end-to-end dashboard navigation.
