import { test } from "node:test";
import assert from "node:assert/strict";
import { getThemePreference, initializeTheme, setThemePreference } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

function createDocument() {
  const listeners = {};
  const toggle = {
    checked: false,
    addEventListener(event, listener) { listeners[event] = listener; },
  };
  return {
    document: {
      documentElement: { dataset: {} },
      getElementById(id) { return id === "dark-mode" ? toggle : null; },
    },
    toggle,
    listeners,
  };
}

test("defaults to light mode when there is no saved preference", () => {
  assert.equal(getThemePreference(createStorage()), "light");
});

test("initializes the page and settings toggle from the saved preference", () => {
  const { document, toggle } = createDocument();
  assert.equal(initializeTheme(document, createStorage({ "plannr-theme": "dark" })), "dark");
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(toggle.checked, true);
});

test("saves a settings toggle change and applies it to the current page", () => {
  const { document, toggle, listeners } = createDocument();
  const storage = createStorage();
  initializeTheme(document, storage);

  toggle.checked = true;
  listeners.change();

  assert.equal(getThemePreference(storage), "dark");
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(setThemePreference("light", storage), "light");
  assert.equal(getThemePreference(storage), "light");
});
