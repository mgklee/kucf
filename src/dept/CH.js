const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "10001", pastCode: "101", row: 1, column: 4, koName: "일반화학 I", enName: "General Chemistry I", courseId: "88" },
    { code: "10002", pastCode: "102", row: 1, column: 3, koName: "일반화학실험 I", enName: "General Chemistry Experiment I", courseId: "89", refs: ["101 Left Right"] },
    { code: "10003", pastCode: "103", row: 1, column: 5, koName: "일반화학Ⅱ", enName: "General Chemistry II", courseId: "1460", prereqs: ["101"] },
    { code: "10004", pastCode: "104", row: 1, column: 6, koName: "일반화학실험Ⅱ", enName: "General Chemistry Experiment II", courseId: "1466", refs: ["103"] },
    { code: "20011", pastCode: "211", row: 2, column: 1, koName: "물리화학 I", enName: "Physical Chemistry I", courseId: "71", prereqs: ["103"] },
    { code: "20012", pastCode: "213", row: 3, column: 2, koName: "물리화학Ⅱ", enName: "Physical Chemistry II", courseId: "1461", refs: ["211"] },
    { code: "20021", pastCode: "221", row: 2, column: 4, koName: "유기화학 I", enName: "Organic Chemistry I", courseId: "72", prereqs: ["103"] },
    { code: "20022", pastCode: "223", row: 3, column: 4, koName: "유기화학Ⅱ", enName: "Organic Chemistry II", courseId: "1467", prereqs: ["221"] },
    { code: "20051", pastCode: "263", row: 2, column: 8, koName: "분석화학개론", enName: "Introduction to Analytical Chemistry", courseId: "90", prereqs: ["103"] },
    { code: "20071", pastCode: "252", row: 3, column: 8, koName: "화학전공실험 I", enName: "Chemistry Major Lab I", courseId: "1462", refs: ["211", "263"] },
    { code: "30011", pastCode: "315", row: 4, column: 3, koName: "물리화학 III", enName: "Physical Chemistry III", courseId: "73", refs: ["213"] },
    { code: "30021", pastCode: "325", row: 3, column: 5, koName: "생유기화학", enName: "Bioorganic Chemistry", courseId: "74", prereqs: ["223"] },
    { code: "30022", pastCode: "336", row: 4, column: 5, koName: "물리유기화학", enName: "Physical Organic Chemistry", courseId: "1469", prereqs: ["223 Bottom Left"] },
    { code: "30031", pastCode: "344", row: 4, column: 6, koName: "무기화학Ⅰ", enName: "Inorganic ChemistryⅠ", courseId: "8856", prereqs: ["103"] },
    { code: "30032", pastCode: "345", row: 5, column: 5, koName: "무기화학Ⅱ", enName: "Inorganic ChemistryⅡ", courseId: "16116", prereqs: ["344 Bottom Right"] },
    { code: "30041", pastCode: "381", row: 4, column: 7, koName: "생화학Ⅰ", enName: "Biochemistry I", courseId: "75", prereqs: ["103"] },
    { code: "30042", pastCode: "382", row: 5, column: 7, koName: "생화학 II", enName: "Biochemistry II", courseId: "1464", prereqs: ["381"] },
    { code: "30071", pastCode: "352", row: 4, column: 8, koName: "화학전공실험 II", enName: "Chemistry Major Lab II", courseId: "100", prereqs: ["252"], refs: ["223"] },
    { code: "30072", pastCode: "353", row: 5, column: 8, koName: "화학전공실험 III", enName: "Chemistry Major Lab III", courseId: "1463", prereqs: ["352"], refs: ["344", "381"] },
    { code: "40011", pastCode: "416", row: 5, column: 1, koName: "분자분광학개론", enName: "Introduction to Molecular Spectroscopy", courseId: "1472", prereqs: ["211"], refs: ["344"] },
    { code: "40013", pastCode: "418", row: 5, column: 2, koName: "계산화학", enName: "Computational Chemistry", courseId: "1471", prereqs: ["211", "213 Bottom Top"] },
    { code: "40014", pastCode: "419", row: 6, column: 5, koName: "고체화학개론", enName: "Introduction to Solid-State Chemistry", courseId: "1473", prereqs: ["344"] },
    { code: "40015", pastCode: "453", row: 3, column: 3, koName: "인공지능 화학", enName: "AI Chemistry", courseId: "23351", prereqs: ["211 Right Top", "213", "223 Left Right"] },
    { code: "40021", pastCode: "437", row: 6, column: 3, koName: "유기분자 구조의 분석과 이해", enName: "Structure Determination and Comprehension of Organic Molecules", courseId: "1474", prereqs: ["223"], refs: ["438"] },
    { code: "40022", pastCode: "438", row: 5, column: 3, koName: "유기반응 및 합성화학", enName: "Organic Reactions and Synthesis", courseId: "1475", prereqs: ["223 Bottom Right"] },
    { code: "40023", pastCode: "439", row: 6, column: 4, koName: "유기금속화학개론", enName: "Introduction to Organometallic Chemistry", courseId: "76", prereqs: ["223"], refs: ["345 Left Top"] },
    { code: "40041", pastCode: "484", row: 6, column: 7, koName: "화학생물학개론", enName: "Introduction to Chemical Biology", courseId: "78", prereqs: ["382"] },
    { code: "40051", pastCode: "464", row: 6, column: 2, koName: "전기화학분석", enName: "Electroanalytical Chemistry", courseId: "23352", prereqs: ["315 Left Right"] },
    { code: "40061", pastCode: "471", row: 6, column: 1, koName: "고분자화학개론", enName: "Introduction to Polymer Chemistry", courseId: "1476" },
    { code: "40081", pastCode: "452", row: 6, column: 6, koName: "나노 화학 개론", enName: "Introduction to Nanochemistry", courseId: "77", prereqs: ["344"] }
];

const miniNodes = [];
const requiredCourses = ["211", "213", "221", "223", "252", "263", "344", "352", "353"];
const irregularCourses = [];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };
