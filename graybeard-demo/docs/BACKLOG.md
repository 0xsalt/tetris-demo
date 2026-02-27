# BACKLOG.md

> Single source of work.
> Review regularly.
> Top item is next.

---

> **Next Available: #010**

## NOW

## BACKLOG

> All items sourced from code review: `docs/internal/research/2026-02-26-code-review.md`
> GH#1: [blocks stop mid air when turned near the ground](https://github.com/0xsalt/tetris-demo/issues/1)
> GH#2: [Blocks can be placed above ceiling](https://github.com/0xsalt/tetris-demo/issues/2)

## ROADMAP

## DONE

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
