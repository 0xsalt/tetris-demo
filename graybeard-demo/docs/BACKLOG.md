# BACKLOG.md

> Single source of work.
> Review regularly.
> Top item is next.

---

> **Next Available: #009**

## NOW

## BACKLOG

- [] #001 `.gitignore` missing PAI private data exclusions (`docs/internal/`, `.conductor/`, `.specify/`) #bug #major
- [] #002 Remove all agentic authorship attribution from repo — 8 commits need author rewrite to "0xsalt", CLAUDE.md in public repo reveals internal conventions #bug #critical #compliance
- [] #003 `isValid()` missing `boardY < 0` bounds check — root cause of Issues #1 and #2 #bug #critical
- [] #004 Lock delay exhaustion allows mid-air piece locking (Issue #1, depends on #003) #bug #major
- [] #005 Extract game logic from monolithic HTML to TypeScript modules #enhancement
- [] #006 Consolidate duplicate rendering functions (drawCell/drawCellAt) #enhancement
- [] #007 Add test coverage for collision, rotation, wall kicks, scoring #enhancement
- [] #008 Flash row animation renders on shifted positions after splice #bug #minor

> All items sourced from code review: `docs/internal/research/2026-02-26-code-review.md`

## ROADMAP

## DONE

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
