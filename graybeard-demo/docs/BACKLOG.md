# BACKLOG.md

> Single source of work.
> Review regularly.
> Top item is next.

---

> **Next Available: #014**

## NOW

- [] #012 Blocks stop mid-air when rotated near ground (GH#1) #bug #major
  - Reproduces despite fixes #003, #004, #009, #010
  - **Triage:** `rotate()` (line 933) accepts in-place rotation without checking lock state.
    Gravity runs on a `dropInterval` timer (line 1077). Lock timer is 500ms (line 748).
    When a piece is on surface and player rapidly rotates, `rotate()` changes orientation
    without calling `updateLockState()` (by design, line 941-942). But the lock timer
    started by `gravityTick()` / `startLockTimer()` fires during or after a rotation that
    moved minos to positions no longer on-surface. The timer callback (line 977) only checks
    `isValid(x, y+1)` — if rotation changed the piece shape such that y+1 is now valid
    (piece "floats" after rotation), the timer clears itself (line 980) and no new gravity
    tick comes until the next `dropInterval`. The piece hangs mid-air until the next gravity
    cycle.
  - **Root cause:** Lock timer expiry (line 976-982) clears itself when `isValid(x, y+1)`
    passes after rotation, but doesn't re-engage gravity. The piece floats until the next
    `dropInterval` tick — which can be up to 1000ms at level 1.
  - **Proposed fix:** After rotation succeeds (line 939), call `updateLockState()` to
    re-evaluate surface contact and restart timers appropriately.

## BACKLOG

- [] #013 Blocks placed above ceiling (GH#2) #bug #major
  - `isValid()` line 822: `if (boardY < 0) continue` allows minos above row 0
  - `lockPiece()` line 1006: skips out-of-bounds minos — they vanish instead of blocking
  - Needs bounds enforcement or game-over trigger when locking above visible area

## ROADMAP

## DONE

- [x] #011 Push local commits to origin/main and verify GitHub Pages deploy #deploy #ops _done:2026-03-02
- [x] #010 Guideline-compliant lock delay — replace sticky flag with dynamic surface check, disable wall kicks, decouple rotation from lock timing #bug #major _done:2026-02-27
- [x] #009 Infinite spin — rapid rotation near surface resets lock delay indefinitely via gravity clearLockTimer cycle #bug #major _done:2026-02-26
- [x] #008 Flash row animation renders on shifted positions after splice #bug #minor _done:2026-02-26
- [x] #007 Add test coverage for collision, rotation, wall kicks, scoring #enhancement _done:2026-02-26
- [x] #006 Consolidate duplicate rendering functions (drawCell/drawCellAt) #enhancement _done:2026-02-26
- [x] #005 Extract game logic from monolithic HTML to TypeScript modules #enhancement _done:2026-02-26
- [x] #004 Lock delay exhaustion allows mid-air piece locking — GH#1 #bug #major _done:2026-02-26
- [x] #003 `isValid()` missing `boardY < 0` bounds check — root cause of GH#1 and GH#2 #bug #critical _done:2026-02-26
- [x] #002 Remove agentic authorship attribution — rewrite 8 commit authors, clean CLAUDE.md #bug #critical #compliance _done:2026-02-26
- [x] #001 Add `.specify/` to .gitignore — PAI private data exclusions #bug #major _done:2026-02-26

---

## Format Reference

**Task syntax:** `- [STATE] #NNN <description> #tag [metadata...]`

| Marker | State |
|--------|-------|
| `[ ]` | Pending |
| `[/]` | In Progress |
| `[x]` | Completed |
| `[-]` | Cancelled |
| `[>]` | Deferred |
| `[?]` | Blocked |

**Required:**
- Persistent `#NNN` identifier (never reused)
- At least one `#tag` per task
- `_done:YYYY-MM-DD` when marking `[x]`
