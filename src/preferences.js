export const DEFAULT_PREFERENCES = Object.freeze({
    codeFormat: "new", nameLanguage: "ko", theme: "light"
});
const STORAGE_KEY = "kucf.display";

export function resolvePreferences(search, saved = {}) {
    const params = new URLSearchParams(search);
    const pick = (param, key, choices) => {
        const value = params.get(param) ?? saved?.[key];
        return choices.includes(value) ? value : DEFAULT_PREFERENCES[key];
    };
    // Read previous URLs and saved values, but always write the new URL format.
    const requestedCode = params.get("code") ?? params.get("codes") ?? saved?.codeFormat;
    const codeFormat = requestedCode === "current" ? "new" : requestedCode;
    return {
        codeFormat: ["past", "new"].includes(codeFormat) ? codeFormat : DEFAULT_PREFERENCES.codeFormat,
        // A previous page's URL must not undo the user's latest page settings.
        nameLanguage: ["ko", "en"].includes(saved?.nameLanguage) ? saved.nameLanguage : pick("lang", "nameLanguage", ["ko", "en"]),
        theme: ["light", "dark"].includes(saved?.theme) ? saved.theme : pick("theme", "theme", ["light", "dark"])
    };
}

export function readPreferences() {
    let saved;
    try { saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)); } catch { /* Storage is optional. */ }
    return resolvePreferences(window.location.search, saved);
}

export function withPreferences(url, preferences) {
    const result = new URL(url);
    const params = new URLSearchParams();
    const department = result.searchParams.get("dept");
    if (department !== null) params.set("dept", department);
    params.set("theme", preferences.theme);
    params.set("lang", preferences.nameLanguage);
    params.set("code", preferences.codeFormat === "past" ? "past" : "new");
    for (const [key, value] of result.searchParams) {
        if (!["dept", "theme", "lang", "code", "codes"].includes(key)) params.append(key, value);
    }
    result.search = params.toString();
    return result;
}

export function savePreferences(preferences) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* Storage is optional. */ }
    window.history.replaceState(null, "", withPreferences(window.location.href, preferences));
}

/** Refresh theme and language on restored pages and other tabs without writing back to storage. */
export function watchPagePreferences(preferences, onChange) {
    function synchronize() {
        const { theme, nameLanguage } = readPreferences();
        if (preferences.theme !== theme || preferences.nameLanguage !== nameLanguage) {
            preferences.theme = theme;
            preferences.nameLanguage = nameLanguage;
            onChange();
        }
        const url = withPreferences(window.location.href, preferences);
        if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
    }
    window.addEventListener("pageshow", synchronize);
    window.addEventListener("storage", event => {
        if (event.key === STORAGE_KEY || event.key === null) synchronize();
    });
    synchronize();
}

export function applyPagePreferences(preferences) {
    document.documentElement.lang = preferences.nameLanguage;
    document.documentElement.dataset.theme = preferences.theme;
    document.body.dataset.theme = preferences.theme;
}
