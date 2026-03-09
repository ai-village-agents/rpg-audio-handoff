// Minimal wiring stubs for sfx trigger points and settings persistence.
// Purpose: illustrate safe, optional-chained calls without coupling to render loops.
// This file is Node-safe (no DOM usage) and is not imported by the game.

// In-game, sfx would be imported from src/audio/sfx.js (added by PR #82):
// import { createSfx } from '../src/audio/sfx.js';

function clamp01(v) {
  return Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
}

// Best-effort init; guard against browsers requiring a user gesture.
function initSfxSafe(factory) {
  try {
    return typeof factory === 'function' ? factory() : null;
  } catch (_e) {
    return null;
  }
}

// Example keys for persistence; align with planned game keys.
const STORAGE_KEYS = {
  master: 'audio.master',
  ui: 'audio.ui',
  map: 'audio.map',
  combat: 'audio.combat',
  muted: 'audio.muted',
};

function readSettings(getItem) {
  const get = (k, d) => {
    const raw = getItem?.(k);
    if (raw == null) return d;
    if (k === STORAGE_KEYS.muted) return raw === 'true';
    const n = Number(raw);
    return Number.isFinite(n) ? clamp01(n) : d;
  };
  return {
    master: get(STORAGE_KEYS.master, 1),
    ui: get(STORAGE_KEYS.ui, 1),
    map: get(STORAGE_KEYS.map, 1),
    combat: get(STORAGE_KEYS.combat, 1),
    muted: get(STORAGE_KEYS.muted, false),
  };
}

function writeSettings(setItem, s) {
  if (!setItem || !s) return;
  setItem(STORAGE_KEYS.master, String(clamp01(s.master)));
  setItem(STORAGE_KEYS.ui, String(clamp01(s.ui)));
  setItem(STORAGE_KEYS.map, String(clamp01(s.map)));
  setItem(STORAGE_KEYS.combat, String(clamp01(s.combat)));
  setItem(STORAGE_KEYS.muted, String(!!s.muted));
}

// Sketch of usage at event boundaries (handlers/state transitions only):
function wireHandlers(bus, sfx) {
  if (!bus) return;
  // UI
  bus.on?.('UI_CLICK', () => sfx?.play('ui', 'ui_click'));
  bus.on?.('UI_CONFIRM', () => sfx?.play('ui', 'ui_confirm'));
  bus.on?.('UI_CANCEL', () => sfx?.play('ui', 'ui_cancel'));
  // Map
  bus.on?.('MAP_STEP', () => sfx?.play('map', 'map_step'));
  bus.on?.('MAP_BLOCKED', () => sfx?.play('map', 'map_blocked'));
  // Combat select
  bus.on?.('COMBAT_SELECT_ATTACK', () => sfx?.play('combat', 'combat_attack'));
  bus.on?.('COMBAT_SELECT_ITEM', () => sfx?.play('combat', 'combat_item'));
  bus.on?.('COMBAT_SELECT_HEAL', () => sfx?.play('combat', 'combat_heal'));
  // Combat resolution
  bus.on?.('COMBAT_HIT', (p) => {
    if (p && typeof p.damage === 'number' && p.damage > 0) {
      sfx?.play('combat', 'combat_hit');
      if (p.crit) sfx?.play('combat', 'combat_crit');
    }
  });
  // End states
  bus.on?.('COMBAT_VICTORY', () => sfx?.play('combat', 'combat_victory'));
  bus.on?.('COMBAT_DEFEAT', () => sfx?.play('combat', 'combat_defeat'));
}

// Example: applying settings to sfx instance
function applySettings(sfx, s) {
  if (!sfx || !s) return;
  sfx.setMasterVolume?.(clamp01(s.master));
  sfx.setCategoryVolume?.('ui', clamp01(s.ui));
  sfx.setCategoryVolume?.('map', clamp01(s.map));
  sfx.setCategoryVolume?.('combat', clamp01(s.combat));
  sfx.setMuted?.(!!s.muted);
}

module.exports = {
  clamp01,
  initSfxSafe,
  readSettings,
  writeSettings,
  wireHandlers,
  applySettings,
  STORAGE_KEYS,
};
