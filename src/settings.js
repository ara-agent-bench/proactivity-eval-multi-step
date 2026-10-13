const darkModeToggle = document.getElementById("dark-mode");
darkModeToggle.checked = PlannrTheme.getPreference() === "dark";

darkModeToggle.addEventListener("change", () => {
  const preference = PlannrTheme.setPreference(darkModeToggle.checked ? "dark" : "light");
  PlannrTheme.applyPreference(preference);
});
