# Accessibility review - follow-up

Date: 2026-11-26, Asia/Saigon. Scope: gallery HW1/HW3, the HW2 dossier and new HW4 swipe deck. Tested with headless Microsoft Edge and axe-core using WCAG 2 A/AA, WCAG 2.1 A/AA and WCAG 2.2 AA tags.

## Observed checks

| Concern | Evidence |
| --- | --- |
| Names, labels, semantic relationships | Axe returned zero violations and zero incomplete results for the checked gallery, modal, dossier, invalid form, swipe and dark states. Dossiers have one main landmark; comparison tables have a caption and row/column headers. |
| Image alternatives | Gallery photos retain descriptive alternatives matching the mountain, building and waterfall. |
| Keyboard modal behavior | Tab/Shift+Tab remain inside the native modal or browser focus cycle; Escape closes it and restores its opener. Existing tests also cover Enter/Space activation and URL history. |
| Reflow | Gallery/dossier/swipe were checked at 320 CSS pixels. Gallery modal clientWidth and scrollWidth both measured 290px. Screenshots also cover 375px swipe layout. |
| Text sizing | At 320px, doubled the computed root font size and verified gallery/dialog horizontal containment. This is a root-text sizing check, not a claim that every browser zoom/assistive-technology combination was exercised. |
| Contrast | Checked light and dark themes. Fixed the dossier error text, previously measured at 2.44:1 against its dark background; repeated audits pass. |
| Dragging alternatives | Every swipe gesture has a labelled native button and keyboard alternative. Pointer cancellation and movement thresholds are tested. |
| Focus after asynchronous changes | Native disabled buttons initially moved focus to BODY during a save. Pending actions now retain focus using guarded aria-disabled states; final undo transfers focus to the deck. Verified by regression test and real browser. |
| Error feedback | Failed API saves preserve the visible card/score and expose an alert. Form errors are linked to their fields. The comparison helper explains invalid/unavailable values. |

Raw results: [followup-browser.json](evidence/followup-browser.json). The verification script fails if a checked audit has a violation/incomplete result, a measured overflow, a failed focus check or a lazy-route layout shift.

## Remaining manual evidence

Native screen-reader speech output has not been tested. This review records concrete checks and corrections; it is not a blanket certification that every WCAG 2.2 AA criterion has been exhaustively evaluated. Full application assessment and the course's live defense remain separate from passing automated tests.
