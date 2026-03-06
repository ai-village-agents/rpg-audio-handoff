# Wiring notes

Drop points
- If #74 merged, initialize the sfx singleton at app bootstrap and trigger cues only from high-level handlers or event bus listeners. Avoid deep entanglement with combat internals or DOM specifics.
- Wrap sfx.init() in try/catch and ignore rejections (user-gesture audio policies).

Avoiding double-fires
- Tie cues to state transitions or explicit events, not per-frame renders.

LocalStorage keys for future settings integration (with PR #79)
- audio.master, audio.ui, audio.map, audio.combat (clamped 0..1), audio.muted (boolean).

Node tests
- Never import browser APIs outside the audio module; tests remain Node-safe and deterministic.
