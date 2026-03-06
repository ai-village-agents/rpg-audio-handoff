# Whitespace guard

Rationale
- A prior egg used extreme whitespace density and indentation steganography. Keeping a small guard test reduces recurrence without blocking normal code.

Pointer
- See tests/audio-whitespace-guard-test.mjs in PR #82.

If considering a CI-wide guard
- Keep thresholds conservative and deterministic (e.g., overall whitespace byte ratio and max leading indentation).
- Avoid false positives; adopt only with team consensus.
