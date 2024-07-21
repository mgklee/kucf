const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 100;

const courses = [
    { code: "101", name: "미적분학 I", row: 1, column: 4, startCourseId: "118" },
    { code: "102", name: "미적분학Ⅱ", row: 1, column: 5, startCourseId: "132", prereqs: ["101"] },
    { code: "109", name: "선형대수학개론", row: 2, column: 2, startCourseId: "101" },
    { code: "201", name: "응용미분방정식", row: 2, column: 3, startCourseId: "102" },
    { code: "202", name: "응용해석학", row: 2, column: 6, startCourseId: "1489", prereqs: ["102 Right Top", "201"] },
    { code: "210", name: "정수론 개론", row: 3, column: 1, startCourseId: "133" },
    { code: "212", name: "선형대수학", row: 3, column: 2, startCourseId: "134", prereqs: ["109"] },
    { code: "241", name: "해석학 I", row: 3, column: 4, startCourseId: "108", refs: ["101"] },
    { code: "242", name: "해석학Ⅱ", row: 4, column: 5, startCourseId: "1490", prereqs: ["241"], refs: ["102"] },
    { code: "250", name: "확률및통계", row: 2, column: 8, startCourseId: "127" },
    { code: "270", name: "논리 및 집합", row: 3, column: 9, startCourseId: "1505" },
    { code: "275", name: "이산수학", row: 4, column: 9, startCourseId: "109" },
    { code: "311", name: "현대대수학 I", row: 4, column: 2, startCourseId: "103", refs: ["212"] },
    { code: "312", name: "현대대수학Ⅱ", row: 5, column: 2, startCourseId: "1491", prereqs: ["311"] },
    { code: "321", name: "미분기하학개론", row: 3, column: 3, startCourseId: "1498", prereqs: ["102", "109"] },
    { code: "331", name: "위상수학", row: 4, column: 4, startCourseId: "104", refs: ["241"] },
    { code: "341", name: "복소변수함수론", row: 4, column: 6, startCourseId: "105", prereqs: ["202"], refs: ["241"] },
    { code: "350", name: "기초확률론", row: 3, column: 7, startCourseId: "128", refs: ["241", "250"] },
    { code: "355", name: "수리통계학", row: 3, column: 8, startCourseId: "1492", refs: ["250"] },
    { code: "364", name: "행렬계산과 응용", row: 6, column: 7, startCourseId: "8312" },
    { code: "365", name: "수치해석학개론", row: 4, column: 7, startCourseId: "129", prereqs: ["241"] },
    { code: "370", name: "정보수학", row: 5, column: 8, startCourseId: "1494", prereqs: ["250 Right Right"] },
    { code: "374", name: "최적화이론", row: 6, column: 8, startCourseId: "1493" },
    { code: "410", name: "암호론", row: 6, column: 1, startCourseId: "3985", prereqs: ["210", "212", "312"] },
    { code: "411", name: "대수기하학개론", row: 6, column: 2, startCourseId: "1506", prereqs: ["312"] },
    { code: "412", name: "가환대수학 입문", row: 7, column: 2, startCourseId: "23398", prereqs: ["312"] },
    { code: "420", name: "다양체해석학", row: 5, column: 3, startCourseId: "119", refs: ["321", "331"] },
    { code: "430", name: "조합적 위상수학", row: 6, column: 4, startCourseId: "1495", prereqs: ["331"] },
    { code: "435", name: "행렬군론", row: 6, column: 3, startCourseId: "120", prereqs: ["212 Bottom Left", "311 Bottom Left", "331"] },
    { code: "440", name: "편미분방정식개론", row: 5, column: 6, startCourseId: "110", prereqs: ["202 Right Top", "242"] },
    { code: "441", name: "르베그적분론", row: 6, column: 5, startCourseId: "1496", prereqs: ["242"] },
    { code: "442", name: "푸리에 해석과 응용", row: 7, column: 5, startCourseId: "3914", refs: ["241 Right Left"] },
    { code: "443", name: "상미분방정식과 동역학계", row: 6, column: 6, startCourseId: "135", prereqs: ["242"] },
    { code: "464", name: "수리역학", row: 7, column: 7, startCourseId: "1499" },
    { code: "456", name: "컴퓨터 통계방법론", row: 4, column: 8, startCourseId: "3849", refs: ["355"] },
    { code: "471", name: "금융수학과 확률모형", row: 7, column: 8, startCourseId: "3913" },
    { code: "473", name: "수학과 인공지능 개론", row: 7, column: 9, startCourseId: "23665" },
    { code: "477", name: "그래프이론 개론", row: 5, column: 9, startCourseId: "1500", prereqs: ["275"] },
    { code: "478", name: "이산기하", row: 6, column: 9, startCourseId: "4349", prereqs: ["275"] }
];

const miniNodes = [
    { code: "109", loc: "1160 523", prereqOf: ["364 Bottom Top", "370 Right Left", "456 Right Left"], refOf: ["365 Top Bottom", "374 Bottom Top", "443 Bottom Top"] },
    { code: "212", loc: "1430 200", prereqOf: ["370 Left Right"] },
    { code: "250", loc: "240 473",  prereqOf: ["410 Left Top"] },
    { code: "312", loc: "1430 246", prereqOf: ["370 Left Right"] }
];

const requiredCourses = ["212", "241", "311", "321", "331", "341", "355"];
const irregularCourses = ["364", "370", "374", "410", "411", "412", "435", "442", "443", "456", "464", "471", "476", "478"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };