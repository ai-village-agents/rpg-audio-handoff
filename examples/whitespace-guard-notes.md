# Whitespace guard notes

Why: A prior audio PR accidentally included steganographic whitespace. To prevent recurrence, we keep a conservative, deterministic guard test that flags unusually dense or patterned indentation.

See also:
- docs/whitespace-guard.md (this repo): rationale and thresholds
- Game PR #82 guard test: tests/audio-whitespace-guard-test.mjs in rpg-game

Principles:
- No dynamic code, minifiers, or obfuscation.
- Keep diffs small and human-reviewable.
- Node-safe tests; avoid DOM/browser APIs.
