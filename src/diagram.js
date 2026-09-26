import { getDepartment } from "./departments.js";
import { buildModel } from "./build-model.js";
import { createDiagram } from "./diagram-view.js";
import { loadGoJS } from "./gojs.js";
import { readPreferences, savePreferences, applyPagePreferences, withPreferences, watchPagePreferences } from "./preferences.js";
import { interfaceText, updateDisplayControls } from "./interface-text.js";
import { dictionaryUrl } from "./course-url.js";

const status = document.getElementById("diagram-status");
const themeButton = document.getElementById("theme-toggle");
const codeButton = document.getElementById("code-format");
const languageButton = document.getElementById("name-language");
const fitButton = document.getElementById("fit-diagram");

async function init() {
    const code = new URLSearchParams(window.location.search).get("dept");
    const department = getDepartment(code);
    const preferences = readPreferences();
    let view;
    let errorKey;

    function updatePage() {
        applyPagePreferences(preferences);
        updateDisplayControls(preferences);
        const text = interfaceText(preferences.nameLanguage);
        document.title = department ? `${text[code]} · ${text.siteTitle}` : text.siteTitle;
        document.getElementById("myDiagramDiv").setAttribute("aria-label", document.title);
        if (errorKey) {
            const link = document.createElement("a");
            link.href = withPreferences(new URL("index.html", window.location.href), preferences);
            link.textContent = text.back;
            status.replaceChildren(document.createTextNode(`${text[errorKey]} `), link);
            status.hidden = false;
        } else if (!view) {
            status.textContent = text.loading;
        }
    }

    updatePage();
    watchPagePreferences(preferences, () => {
        updatePage();
        view?.setTheme(preferences.theme);
        view?.setDisplayPreferences(preferences);
    });
    themeButton.addEventListener("click", () => {
        preferences.theme = preferences.theme === "light" ? "dark" : "light";
        updatePage();
        view?.setTheme(preferences.theme);
        savePreferences(preferences);
    });
    languageButton.disabled = false;
    languageButton.addEventListener("click", () => {
        preferences.nameLanguage = preferences.nameLanguage === "ko" ? "en" : "ko";
        updatePage();
        view?.setDisplayPreferences(preferences);
        savePreferences(preferences);
    });

    if (!department) {
        errorKey = "invalidDepartment";
        updatePage();
        return;
    }
    try {
        const model = buildModel(code, department.data);
        const go = await loadGoJS();
        // Load both languages' glyphs before measuring, including uncommon symbols.
        const labels = model.nodeDataArray.map(node => `${node.text} ${node.enName ?? ""}`).join(" ");
        try {
            await document.fonts.load("12px Noto Sans KR", labels);
        } catch { /* Render with fallback fonts if the web font is unavailable. */ }
        await document.fonts.ready;
        view = createDiagram(go, {
            container: "myDiagramDiv", model,
            nodeWidth: department.data.nodeWidth,
            nodeHeight: department.data.nodeHeight,
            displayPreferences: preferences,
            theme: preferences.theme,
            onOpenCourse: course => window.open(dictionaryUrl(course.courseId), "_blank", "noopener,noreferrer")
        });
        codeButton.addEventListener("click", () => {
            preferences.codeFormat = preferences.codeFormat === "past" ? "new" : "past";
            view.setDisplayPreferences(preferences);
            updatePage();
            savePreferences(preferences);
        });
        codeButton.disabled = false;
        fitButton.addEventListener("click", view.fit);
        fitButton.disabled = false;
        status.hidden = true;
        window.requestAnimationFrame(() => { view.diagram.requestUpdate(); view.fit(); });
    } catch (error) {
        errorKey = "diagramError";
        updatePage();
        console.error("Could not initialize the course diagram:", error);
    }
}

init();
