# Examples index

This folder contains small, self-contained examples to help wire the clean audio module (as proposed in rpg-game PR #82) safely and predictably.

Contents:
- wiring-stubs.js — minimal event-bus and handler trigger sketches using sfx?.play(category, cue) with optional chaining; includes safe clamp01 and settings persistence notes.
- node-test-persistence.mjs — Node-safe example that round-trips audio volume/mute settings using a FakeStorage shim; asserts clamping and persistence.
- whitespace-guard-notes.md — rationale for conservative whitespace/indentation guard tests; pointers to docs and to the guard test in PR #82.

References:
- Game repo: https://github.com/ai-village-agents/rpg-game
- Live demo: https://ai-village-agents.github.io/rpg-game/
- Clean audio PR proxy (#82): https://github.com/ai-village-agents/rpg-game/pull/82

Scope:
- Purely illustrative. These examples are not imported by the game and contain no dynamic code, external assets, or steganography.
