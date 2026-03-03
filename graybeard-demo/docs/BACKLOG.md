# BACKLOG.md

> Single source of work.
> Review regularly.
> Top item is next.

---

> **Next Available: #017**

## NOW

- [] #012 Blocks stop mid-air when rotated near ground (GH#1) #bug #major
  - **History:** v1 added `updateLockState()` after rotation. v2 added gravity resume
    (`lastDrop` reset). v3 prevented timer restart on moves (broke Guideline).
    v4 rewrote as timestamp-based state machine with `lockPhase`/`lockStartTime`.
    Partially fixed but L piece still walks bottom when spamming rotation.
  - **Research ref:** `docs/tetris-deep-research.md` (Section 5 lock delay, Section 6 anti-infinity)
  - **Root cause (per research gap analysis):** Single `updateLockState()` merges timer
    management and move counting. Two specific bugs remain:
    1. `descendedToNewLow` via `getLowestMino()` (line 852-858) falsely resets `lockMoves=0`
       when rotation changes piece shape — L piece rotation 0→1 changes lowest mino from
       `y+1` to `y+2`, triggering descent reset without actual downward movement.
    2. Timer restarts on every `updateLockState()` call including gravity steps that should
       only tick the timer, not restart it.
  - **Proposed fix (from research):** Split into two functions per research pseudocode:
    - `onPieceMoveOrRotate()`: if `lockResets < 15`, reset lockTimer, increment lockResets
    - `updateLockDelay(delta)`: tick timer, check expiry. If not on surface: reset timer + counter
    - Remove `descendedToNewLow` / `getLowestMino()` tracking — use simpler model where
      counter resets only when piece leaves surface

## BACKLOG

- [] #014 Gravity accumulator — while-loop for multiple gravity steps per frame #enhancement #minor
  - **Research ref:** `docs/tetris-deep-research.md` Section 2.1
  - Current: `if (timestamp - lastDrop >= dropInterval)` — single step per frame
  - Research: `while (gravityTimer >= gravityInterval) { movePieceDown(); gravityTimer -= interval; }`
  - At high levels (67ms interval, 16ms frame), one step per frame works. But at very high
    levels or on slow devices, multiple steps could be needed per frame.
  - Accumulator pattern also prevents gravity drift from rounding errors.
  - **Files:** `src/public/index.html` line 1058-1071 `gravityTick()`

- [] #015 DAS/ARR input handling — replace custom key repeat with proper delayed auto-shift #enhancement #minor
  - **Research ref:** `docs/tetris-deep-research.md` Section 3.1
  - Current: custom `setTimeout`-based key repeat (lines 1418-1435) with hardcoded delays
  - Research: Tetris Guideline DAS (167ms initial delay) + ARR (33ms repeat rate)
  - Proper DAS/ARR gives consistent, tunable movement speed independent of OS key repeat
  - Input buffering at high gravity speeds ensures playability
  - **Files:** `src/public/index.html` key event handlers (lines 1400-1500)

- [] #016 SRS wall kicks — implement kick tables for rotation near surfaces #enhancement #major
  - Kick table data already exists in `src/game-logic.ts` (KICKS_NORMAL, KICKS_I)
  - `rotate()` currently does in-place only (line 936-940) — no displacement
  - Without wall kicks, many rotations fail near surfaces, reducing playability
  - Previous attempt caused displacement bugs — needs tests-first approach
  - **Files:** `src/public/index.html` `rotate()`, `src/game-logic.ts` `tryRotate()`

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
