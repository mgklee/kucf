const translations = {
    ko: {
        siteTitle: "KAIST 학사과정 교과목 순서도",
        heading: "학사과정 교과목 순서도",
        intro: "본 순서도는 KAIST 일부 학부·학과의 학사과정 교과목 사이 선수·참고 과목 관계를 정리한 도표입니다.",
        unofficial: "학부·학과에서 공식적으로 제공하는 것이 아니므로 수강 신청 시 참고하는 용도로만 사용하시기 바랍니다.",
        syllabus: "선수·참고 과목은 같은 과목이라도 학기마다 다를 수 있으므로 반드시 학사시스템에 탑재된 해당 학기 강의 계획서를 참고하시기 바랍니다.",
        omissions: "특강을 비롯한 단발적·비정규적으로 열리는 과목 또는 사실상 폐지된 과목은 제외됐을 수 있습니다.",
        contactBefore: "기존 정보에 수정을 제안하시거나 목록에 새 학부·학과 추가를 요청하시려면 ",
        email: "메일", contactAfter: "로 부탁드립니다.",
        legend: "범례", dictionaryBefore: "실제 과목 상자를 클릭하면 해당 과목의 ",
        dictionary: "OTL 과목사전", dictionaryAfter: "으로 연결됩니다.",
        legendLabel: "교과목 순서도 범례",
        mathNote: "*수리과학과 전공 또는 복수전공은 배경이 강조된 7과목 중 4과목 이상 이수해야 합니다.",
        directory: "목록", sciences: "자연과학대학", engineering: "공과대학",
        PH: "물리학과", MAS: "수리과학과", CH: "화학과", EE: "전기 및 전자공학부", CS: "전산학부",
        references: "참고 자료", requirements: "이수 요건",
        settings: "표시 설정",
        toDark: "다크 테마로 전환", toLight: "라이트 테마로 전환",
        toEnglish: "영어로 전환", toKorean: "한국어로 전환",
        currentCode: "현재 과목 코드", toCurrent: "현재 과목 코드로 전환", toPast: "과거 과목 코드로 전환",
        resetZoom: "줌 초기화", fit: "줌 초기화 · 전체 보기",
        loading: "순서도를 불러오는 중입니다.",
        invalidDepartment: "학과 정보가 없거나 올바르지 않습니다.",
        diagramError: "순서도를 불러오지 못했습니다. 연결 상태를 확인한 뒤 새로 고침해 주세요.",
        legendError: "범례를 불러오지 못했습니다. 연결 상태를 확인한 뒤 새로 고침해 주세요.",
        back: "학부·학과 목록으로 돌아가기",
        legendCourse: "과목번호\n과목명",
        legendCategory: "배경색–과목 구분\n강조: 전공 필수*\n기본: 전공 선택",
        legendSchedule: "테두리–개설 주기\n실선: 매년/매 학기\n점선: 격년/불규칙적",
        prerequisite: "선수 과목", reference: "참고 과목"
    },
    en: {
        siteTitle: "KAIST Undergraduate Course Flowcharts",
        heading: "Undergraduate Course Flowcharts",
        intro: "These flowcharts show prerequisite and recommended background courses for undergraduate programs in selected KAIST departments and schools.",
        unofficial: "These are unofficial guides, not materials published by the departments. Use them only as a reference when planning your courses.",
        syllabus: "Prerequisites and recommended background may vary by semester, even for the same course. Always check the syllabus for the relevant semester in the academic system.",
        omissions: "Special topics, one-time or irregular offerings, and courses that are effectively discontinued may be omitted.",
        contactBefore: "To suggest a correction or request another department, please ",
        email: "email me", contactAfter: ".",
        legend: "Legend", dictionaryBefore: "Click a course box to open its entry in the ",
        dictionary: "OTL Course Dictionary", dictionaryAfter: ".",
        legendLabel: "Course flowchart legend",
        mathNote: "*Mathematical Sciences majors and double majors must complete at least four of the seven courses with shaded backgrounds.",
        directory: "Departments", sciences: "College of Natural Sciences", engineering: "College of Engineering",
        PH: "Department of Physics", MAS: "Department of Mathematical Sciences", CH: "Department of Chemistry",
        EE: "School of Electrical Engineering", CS: "School of Computing",
        references: "References", requirements: "Requirements",
        settings: "Display settings",
        toDark: "Switch to dark theme", toLight: "Switch to light theme",
        toEnglish: "Switch to English", toKorean: "Switch to Korean",
        currentCode: "Current course codes", toCurrent: "Switch to current course codes", toPast: "Switch to past course codes",
        resetZoom: "Reset zoom", fit: "Reset zoom · Fit all courses",
        loading: "Loading the course flowchart…",
        invalidDepartment: "The department is missing or invalid.",
        diagramError: "The flowchart could not be loaded. Check your connection and reload the page.",
        legendError: "The legend could not be loaded. Check your connection and reload the page.",
        back: "Back to departments",
        legendCourse: "Course Code\nCourse Name",
        legendCategory: "Background–Category\nShaded: Required*\nPlain: Elective",
        legendSchedule: "Border–Offering Schedule\nSolid: Every year/term\nDashed: Irregular",
        prerequisite: "Prerequisite", reference: "Recommended"
    }
};

export function interfaceText(language = "ko") {
    return translations[language] ?? translations.ko;
}

export function updateDisplayControls(preferences) {
    const text = interfaceText(preferences.nameLanguage);
    const dark = preferences.theme === "dark";
    const themeButton = document.getElementById("theme-toggle");
    themeButton.title = dark ? text.toLight : text.toDark;
    themeButton.setAttribute("aria-label", themeButton.title);
    const languageButton = document.getElementById("name-language");
    const english = preferences.nameLanguage === "en";
    languageButton.querySelector(".language-glyph").textContent = english ? "A" : "가";
    languageButton.title = english ? text.toKorean : text.toEnglish;
    languageButton.setAttribute("aria-label", languageButton.title);
    const codeButton = document.getElementById("code-format");
    if (codeButton) {
        codeButton.setAttribute("aria-label", text.currentCode);
        codeButton.setAttribute("aria-pressed", String(preferences.codeFormat === "new"));
        codeButton.title = preferences.codeFormat === "new" ? text.toPast : text.toCurrent;
    }
    const fitButton = document.getElementById("fit-diagram");
    if (fitButton) {
        fitButton.setAttribute("aria-label", text.resetZoom);
        fitButton.title = text.fit;
    }
    document.querySelector('[role="group"]').setAttribute("aria-label", text.settings);
}
