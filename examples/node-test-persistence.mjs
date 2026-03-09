import assert from 'assert/strict';
import { clamp01, readSettings, writeSettings, STORAGE_KEYS } from './wiring-stubs.js';

class FakeStorage {
  constructor() { this.map = new Map(); }
  getItem(k) { return this.map.has(k) ? this.map.get(k) : null; }
  setItem(k, v) { this.map.set(k, String(v)); }
}

// clamp01
assert.equal(clamp01(-1), 0);
assert.equal(clamp01(0), 0);
assert.equal(clamp01(0.5), 0.5);
assert.equal(clamp01(1), 1);
assert.equal(clamp01(2), 1);
assert.equal(clamp01(NaN), 0);

// round-trip defaults
const s = new FakeStorage();
const defaults = readSettings((k) => s.getItem(k));
assert.deepEqual(defaults, { master: 1, ui: 1, map: 1, combat: 1, muted: false });

// persist + clamp
writeSettings((k, v) => s.setItem(k, v), { master: 1.2, ui: -0.1, map: 0.25, combat: 0.99, muted: true });
const after = readSettings((k) => s.getItem(k));
assert.deepEqual(after, { master: 1, ui: 0, map: 0.25, combat: 0.99, muted: true });

// ensure keys were written as strings
for (const k of Object.values(STORAGE_KEYS)) {
  const v = s.getItem(k);
  assert.equal(typeof v, 'string');
}

console.log('ok');
