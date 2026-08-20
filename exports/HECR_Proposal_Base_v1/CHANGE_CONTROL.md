# Proposal Base — Change Control

The **visual shell** is the reusable proposal base. The **content object** inside `HECR_Client_Proposal_Base_v1.html` is the only normal edit surface. This separation prevents a good-looking layout from slowly accumulating outdated promises, changing commercial terms, or untested system claims.

## Three Change Classes

| Change class | Examples | Approval required | Version effect |
|---|---|---|---|
| **Content-only** | Client name, approved scope, stages, proof points, customer language | Scope owner verifies source | Update proposal date; preserve base version |
| **Structured content** | Add/remove a stage, change the journey sequence, create an offer-specific module | Travis approves a decision record | Minor base version: `v1.1` |
| **Visual / behavioral** | Typography, color tokens, grid, mobile behavior, print layout, renderer logic | Travis approves visual baseline change | Major base version: `v2.0` |

## Proposal Safety Gate

Before a proposal is called client-ready, verify these statements.

1. Every claim is either an approved scope commitment, an explicit future-state proposal, or a verified current capability.
2. No price, product entitlement, integration, completion date, or performance number appears without an approved decision record.
3. The proposal distinguishes human decision-making from system support wherever commercial, sensitive, legal, financial, or service-exception judgment is involved.
4. The proposal does not imply that a tool is configured, live, compliant, or tested merely because it appears in the visual map.
5. The proposal’s version and client/date are updated, and the final HTML/PDF snapshot is saved beside the content source.

## Regression Rule

Never edit layout and offer content in the same pass. First approve the content in the content object or JSON. Then render. If the layout needs to change, fork a new base version and keep the previous one intact.
