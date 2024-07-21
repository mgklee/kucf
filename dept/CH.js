const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "101", name: "일반화학 I", row: 1, column: 4, startCourseId: "88" },
    { code: "102", name: "일반화학실험 I", row: 1, column: 3, startCourseId: "89", refs: ["101 Left Right"] },
    { code: "103", name: "일반화학Ⅱ", row: 1, column: 5, startCourseId: "1460", prereqs: ["101"] },
    { code: "104", name: "일반화학실험Ⅱ", row: 1, column: 6, startCourseId: "1466", refs: ["103"] },
    { code: "211", name: "물리화학 I", row: 2, column: 1, startCourseId: "71", prereqs: ["103"] },
    { code: "213", name: "물리화학Ⅱ", row: 3, column: 2, startCourseId: "1461", refs: ["211"] },
    { code: "221", name: "유기화학 I", row: 2, column: 4, startCourseId: "72", prereqs: ["103"] },
    { code: "223", name: "유기화학Ⅱ", row: 3, column: 4, startCourseId: "1467", prereqs: ["221"] },
    { code: "252", name: "화학전공실험 I", row: 3, column: 8, startCourseId: "1462", refs: ["211", "263"] },
    { code: "263", name: "분석화학개론", row: 2, column: 8, startCourseId: "90", prereqs: ["103"] },
    { code: "315", name: "물리화학 III", row: 4, column: 3, startCourseId: "73", refs: ["213"] },
    { code: "325", name: "생유기화학", row: 3, column: 5, startCourseId: "74", prereqs: ["223"] },
    { code: "336", name: "물리유기화학", row: 4, column: 5, startCourseId: "1469", prereqs: ["223 Bottom Left"] },
    { code: "344", name: "무기화학Ⅰ", row: 4, column: 6, startCourseId: "8856", prereqs: ["103"] },
    { code: "345", name: "무기화학Ⅱ", row: 5, column: 5, startCourseId: "16116", prereqs: ["344"] },
    { code: "352", name: "화학전공실험 II", row: 4, column: 8, startCourseId: "100", prereqs: ["252"], refs: ["223"] },
    { code: "353", name: "화학전공실험 III", row: 5, column: 8, startCourseId: "1463", prereqs: ["352"], refs: ["344", "381"] },
    { code: "381", name: "생화학Ⅰ", row: 4, column: 7, startCourseId: "75", prereqs: ["103"] },
    { code: "382", name: "생화학 II", row: 5, column: 7, startCourseId: "1464", prereqs: ["381"] },
    { code: "416", name: "분자분광학개론", row: 5, column: 1, startCourseId: "1472", prereqs: ["211"], refs: ["344"] },
    { code: "418", name: "계산화학", row: 5, column: 2, startCourseId: "1471", prereqs: ["211", "213 Bottom Top"] },
    { code: "419", name: "고체화학개론", row: 6, column: 5, startCourseId: "1473", prereqs: ["344"] },
    { code: "437", name: "유기분자 구조의 분석과 이해", row: 6, column: 3, startCourseId: "1474", prereqs: ["223"], refs: ["438"] },
    { code: "438", name: "유기반응 및 합성화학", row: 5, column: 3, startCourseId: "1475", prereqs: ["223"] },
    { code: "439", name: "유기금속화학개론", row: 6, column: 4, startCourseId: "76", prereqs: ["223"], refs: ["345 Left Top"] },
    { code: "452", name: "나노 화학 개론", row: 6, column: 6, startCourseId: "77", prereqs: ["344"] },
    { code: "453", name: "인공지능 화학", row: 3, column: 3, startCourseId: "23351", prereqs: ["211", "213", "223 Left Right"] },
    { code: "464", name: "전기화학분석", row: 6, column: 2, startCourseId: "23352", prereqs: ["315 Left Right"] },
    { code: "471", name: "고분자화학개론", row: 6, column: 1, startCourseId: "1476" },
    { code: "484", name: "화학생물학개론", row: 6, column: 7, startCourseId: "78", prereqs: ["382"] } 
];

const miniNodes = [];
const requiredCourses = ["211", "213", "221", "223", "252", "263", "344", "352", "353"];
const irregularCourses = [];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };