const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 100;

const courses = [
    { code: "101", row: 1, column: 5, name: "미적분학 I", startCourseId: "118" },
    { code: "102", row: 1, column: 6, name: "미적분학Ⅱ", startCourseId: "132", prereqs: ["101"] },
    { code: "109", row: 2, column: 2, name: "선형대수학개론", startCourseId: "101" },
    { code: "110", row: 2, column: 1, name: "데이터과학을 위한 선형대수학", startCourseId: "23777" },
    { code: "201", row: 2, column: 3, name: "응용미분방정식", startCourseId: "102" },
    { code: "202", row: 2, column: 4, name: "응용해석학", startCourseId: "1489", prereqs: ["102 Bottom Right", "201"] },
    { code: "210", row: 3, column: 1, name: "정수론 개론", startCourseId: "133" },
    { code: "212", row: 3, column: 2, name: "선형대수학", startCourseId: "134", prereqs: ["109"] },
    { code: "241", row: 3, column: 5, name: "해석학 I", startCourseId: "108", refs: ["101"] },
    { code: "242", row: 3, column: 6, name: "해석학Ⅱ", startCourseId: "1490", prereqs: ["241"], refs: ["102"] },
    { code: "250", row: 2, column: 7, name: "확률및통계", startCourseId: "127" },
    { code: "270", row: 3, column: 9, name: "논리 및 집합", startCourseId: "1505" },
    { code: "275", row: 4, column: 9, name: "이산수학", startCourseId: "109" },
    { code: "311", row: 4, column: 2, name: "현대대수학 I", startCourseId: "103", refs: ["212"] },
    { code: "312", row: 5, column: 2, name: "현대대수학Ⅱ", startCourseId: "1491", prereqs: ["311"] },
    { code: "321", row: 4, column: 3, name: "미분기하학개론", startCourseId: "1498", prereqs: ["102", "109"], refs: ["241 Left Top"] },
    { code: "331", row: 4, column: 4, name: "위상수학", startCourseId: "104", refs: ["241 Left Top"] },
    { code: "341", row: 4, column: 5, name: "복소변수함수론", startCourseId: "105", prereqs: ["241"] },
    { code: "350", row: 4, column: 6, name: "기초확률론", startCourseId: "128", refs: ["242", "250"] },
    { code: "355", row: 4, column: 7, name: "수리통계학", startCourseId: "1492", refs: ["250"] },
    { code: "364", row: 6, column: 7, name: "행렬계산과 응용", startCourseId: "8312" },
    { code: "365", row: 4, column: 8, name: "수치해석학개론", startCourseId: "129" },
    { code: "374", row: 6, column: 8, name: "최적화이론", startCourseId: "1493" },
    { code: "411", row: 7, column: 1, name: "대수기하학개론", startCourseId: "1506", prereqs: ["312"] },
    { code: "412", row: 7, column: 2, name: "가환대수학 입문", startCourseId: "23398", prereqs: ["312"] },
    { code: "420", row: 6, column: 3, name: "다양체해석학", startCourseId: "119", prereqs: ["321"], refs: ["331"] },
    { code: "430", row: 6, column: 4, name: "조합적 위상수학", startCourseId: "1495", prereqs: ["331"] },
    { code: "435", row: 7, column: 4, name: "행렬군론", startCourseId: "120", prereqs: ["212 Right Left", "311 Right Left", "331 Bottom Left"], refs: ["430"] },
    { code: "440", row: 6, column: 5, name: "편미분방정식개론", startCourseId: "110", prereqs: ["242 Left Right"] },
    { code: "441", row: 6, column: 6, name: "르베그적분론", startCourseId: "1496", prereqs: ["242 Left Left"] },
    { code: "442", row: 7, column: 5, name: "푸리에 해석과 응용", startCourseId: "3914", refs: ["241 Left Left"] },
    { code: "443", row: 7, column: 6, name: "상미분방정식과 동역학계", startCourseId: "135" },
    { code: "464", row: 7, column: 7, name: "수리역학", startCourseId: "1499" },
    { code: "456", row: 5, column: 7, name: "컴퓨터 통계방법론", startCourseId: "3849", refs: ["355"] },
    { code: "473", row: 7, column: 8, name: "수학과 인공지능 개론", startCourseId: "23665" },
    { code: "477", row: 6, column: 9, name: "그래프이론 개론", startCourseId: "1500", prereqs: ["275"] },
    { code: "478", row: 7, column: 9, name: "이산기하", startCourseId: "4349", prereqs: ["275 Bottom Right"] }
];

const miniNodes = [
    { code: "109", loc: "1320 523", prereqOf: ["364 Bottom Top", "370 Right Left", "456 Left Right"], refOf: ["365 Top Bottom", "374 Bottom Top"] },
    { code: "202", loc: "840 523", refOf: ["341 Top Bottom", "440 Bottom Top"] }
];

const requiredCourses = ["212", "241", "311", "321", "331", "341", "355"];
const irregularCourses = ["364", "374", "411", "412", "435", "442", "443", "456", "464", "478"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };