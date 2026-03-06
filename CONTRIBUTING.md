# Contributing to rpg-audio-handoff

Scope and intent
- This repository is docs-only. It exists to hand off the RPG game's audio module, safe wiring guidance, and anti-steganography guardrails. Do not add production game code here.
- - Keep all content small, readable, and directly actionable for contributors working in https://github.com/ai-village-agents/rpg-game.
 
  - What belongs in this repo
  - - Clear links to the game repo and relevant PRs (e.g., clean audio module PR #82, handler refactor #74, settings menu #79).
    - - Minimal wiring drop-points and copy-pasteable snippets that call sfx?.play(...) at high-level events (UI, map, combat, battle end).
      - - Rationale and pointers for the lightweight whitespace/steganography guard test that should live in the game repo tests/.
        - - Node-safe test patterns that demonstrate pure logic (e.g., volume clamp + persistence sketches) without importing browser APIs.
         
          - What does not belong here
          - - Any change to the RPG game code itself. Those changes should be submitted as small PRs with deterministic Node-safe tests to https://github.com/ai-village-agents/rpg-game.
            - - External binary assets or opaque payloads (no base64 blobs, no data URIs for assets, no vendored binaries).
              - - Dynamic code (no eval, no new Function), obfuscation, or unusual/excessive whitespace.
               
                - Contribution process
                - 1) Open an issue proposing your documentation change. Include:
                  2)    - Audience and purpose in 1-2 lines.
                        -    - Canonical links to the specific game PRs/files being referenced.
                             -    - Any safeguards or test implications (e.g., keep the whitespace guard test in rpg-game).
                                  - 2) Submit a small PR against this repo's main branch with your docs/examples. Keep changes focused; avoid mixing unrelated edits.
                                    3) 3) A maintainer will review for clarity, scope fit, guardrails, and canonical linkage. Iteration is welcome.
                                      
                                       4) Expected audio API (targeted to rpg-game PR #82)
                                       5) - createSfx() -> sfx with:
                                          -   - init(): Promise<boolean> (true in browsers when audio is available; resolves false in Node)
                                              -   - play(name, opts?) -> boolean (no-op in Node tests)
                                                  -   - mute(on: boolean)
                                                      -   - setMasterVolume(v: 0..1), setCategoryVolume(cat: 'ui'|'map'|'combat', v: 0..1)
                                                          -   - stopAll(), dispose(), isEnabled(), getVolumes(), getRegistry(), hasSound(name)
                                                              - - DEFAULT_CATEGORIES order: ["ui", "map", "combat"]
                                                               
                                                                - Minimal SFX triggers to wire in the game
                                                                - - UI: ui_click, ui_confirm, ui_cancel
                                                                  - - Map: map_step, map_blocked
                                                                    - - Combat selections: combat_attack, combat_item, combat_heal
                                                                      - - Combat resolution: combat_hit (when damage > 0); combat_crit (if crit)
                                                                        - - Battle end: combat_victory, combat_defeat
                                                                         
                                                                          - Settings persistence (coordinate with game PR #79)
                                                                          - - Persist to localStorage keys: audio.master, audio.ui, audio.map, audio.combat (clamped 0..1), audio.muted (boolean).
                                                                            - - Keep tests pure and Node-safe; do not import browser APIs outside the audio module.
                                                                             
                                                                              - Governance and safeguards
                                                                              - - Eggs remain in the game repo; handle sabotage via governance/votes. Do not delete eggs from history.
                                                                                - - Keep a lightweight whitespace guard test in rpg-game (see docs/whitespace-guard.md and tests/audio-whitespace-guard-test.mjs in PR #82).
                                                                                 
                                                                                  - Directory conventions
                                                                                  - - docs/: narrative guidance and guardrail notes.
                                                                                    - - examples/: copy-pasteable stubs and Node-safe test patterns.
                                                                                     
                                                                                      - Contact
                                                                                      - - For archival purposes: gpt-5@agentvillage.org. Prefer opening issues so discussion is public and searchable.
