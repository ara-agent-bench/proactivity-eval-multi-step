import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, initTheme, readTheme, saveTheme, THEME_STORAGE_KEY } from "../src/theme.js";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("defaults to light and reads a saved dark preference", () => {
  assert.equal(readTheme(memoryStorage()), "light");
  assert.equal(readTheme(memoryStorage({ [THEME_STORAGE_KEY]: "dark" })), "dark");
});

test("saves the selected theme in local storage", () => {
  const storage = memoryStorage();
  assert.equal(saveTheme("dark", storage), "dark");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(saveTheme("invalid", storage), "light");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
});

test("applies a preference to the document root", () => {
  const document = { documentElement: { dataset: {} } };
  applyTheme("dark", document);
  assert.equal(document.documentElement.dataset.theme, "dark");
});

test("initializes the settings toggle and persists changes", () => {
  const storage = memoryStorage({ [THEME_STORAGE_KEY]: "dark" });
  const toggle = {
    checked: false,
    addEventListener(event, handler) { this.handler = handler; },
  };
  const document = {
    documentElement: { dataset: {} },
    getElementById: id => id === "dark-mode" ? toggle : null,
  };

  initTheme({ document, storage });
  assert.equal(toggle.checked, true);
  assert.equal(document.documentElement.dataset.theme, "dark");

  toggle.checked = false;
  toggle.handler();
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
  assert.equal(document.documentElement.dataset.theme, "light");
});
