import { createLegend } from "./legend.js";
import { readPreferences, savePreferences, applyPagePreferences, withPreferences, watchPagePreferences } from "./preferences.js";
import { interfaceText, updateDisplayControls } from "./interface-text.js";

const preferences = readPreferences();
const status = document.getElementById("legend-status");
let legend;
let legendFailed = false;

function updatePage() {
    applyPagePreferences(preferences);
    updateDisplayControls(preferences);
    const text = interfaceText(preferences.nameLanguage);
    document.title = text.siteTitle;
    for (const element of document.querySelectorAll("[data-i18n]")) {
        element.textContent = text[element.dataset.i18n];
    }
    document.getElementById("myDiagramDiv").setAttribute("aria-label", text.legendLabel);
    document.getElementById("kaist-link").href = `https://www.kaist.ac.kr/${preferences.nameLanguage === "en" ? "en" : "kr"}/`;
    for (const link of document.querySelectorAll(".department-name")) {
        link.href = withPreferences(new URL(link.href), { ...preferences, codeFormat: "new" });
    }
    if (legendFailed) status.textContent = text.legendError;
    legend?.setPreferences(preferences);
}

updatePage();
watchPagePreferences(preferences, updatePage);
for (const [id, key, first, second] of [
    ["theme-toggle", "theme", "light", "dark"],
    ["name-language", "nameLanguage", "ko", "en"]
]) {
    document.getElementById(id).addEventListener("click", () => {
        preferences[key] = preferences[key] === first ? second : first;
        updatePage();
        savePreferences(preferences);
    });
}

try {
    legend = await createLegend(preferences);
} catch (error) {
    legendFailed = true;
    status.hidden = false;
    updatePage();
    console.error("Could not initialize the legend:", error);
}
