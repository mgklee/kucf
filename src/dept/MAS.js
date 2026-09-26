const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 100;

const courses = [
    { code: "10001", pastCode: "101", row: 1, column: 5, koName: "미적분학 I", enName: "Calculus 1", courseId: "118" },
    { code: "10002", pastCode: "102", row: 1, column: 6, koName: "미적분학Ⅱ", enName: "Calculus II", courseId: "132", prereqs: ["101"] },
    { code: "10009", pastCode: "109", row: 2, column: 2, koName: "선형대수학개론", enName: "Introduction to Linear Algebra", courseId: "101" },
    { code: "10010", pastCode: "110", row: 2, column: 1, koName: "데이터과학을 위한 선형대수학", enName: "Linear Algebra for Data Science", courseId: "23777" },
    { code: "20001", pastCode: "201", row: 2, column: 3, koName: "응용미분방정식", enName: "Differential Equations and Applications", courseId: "102" },
    { code: "20002", pastCode: "202", row: 2, column: 4, koName: "응용해석학", enName: "Applied Mathematical Analysis", courseId: "1489", prereqs: ["102 Bottom Right", "201"] },
    { code: "20010", pastCode: "210", row: 3, column: 1, koName: "정수론 개론", enName: "Introduction to Number Theory", courseId: "133" },
    { code: "20012", pastCode: "212", row: 3, column: 2, koName: "선형대수학", enName: "Linear Algebra", courseId: "134", prereqs: ["109"] },
    { code: "20041", pastCode: "241", row: 3, column: 5, koName: "해석학 I", enName: "Analysis 1", courseId: "108", refs: ["101"] },
    { code: "20042", pastCode: "242", row: 3, column: 6, koName: "해석학Ⅱ", enName: "Analysis II", courseId: "1490", prereqs: ["241"], refs: ["102"] },
    { code: "20050", pastCode: "250", row: 2, column: 7, koName: "확률및통계", enName: "Probability and Statistics", courseId: "127" },
    { code: "20070", pastCode: "270", row: 2, column: 8, koName: "논리 및 집합", enName: "Logic and Set Theory", courseId: "1505" },
    { code: "20075", pastCode: "275", row: 2, column: 9, koName: "이산수학", enName: "Discrete Mathematics", courseId: "109" },
    { code: "30011", pastCode: "311", row: 4, column: 2, koName: "현대대수학 I", enName: "Modern Algebra I", courseId: "103", refs: ["212"] },
    { code: "30012", pastCode: "312", row: 5, column: 2, koName: "현대대수학Ⅱ", enName: "Modern Algebra II", courseId: "1491", prereqs: ["311"] },
    { code: "30021", pastCode: "321", row: 4, column: 3, koName: "미분기하학개론", enName: "Introduction to Differential Geometry", courseId: "1498", prereqs: ["102", "109"], refs: ["241 Left Top"] },
    { code: "30031", pastCode: "331", row: 4, column: 4, koName: "위상수학", enName: "Topology", courseId: "104", refs: ["241 Left Top"] },
    { code: "30041", pastCode: "341", row: 4, column: 5, koName: "복소변수함수론", enName: "Complex Variables I", courseId: "105", prereqs: ["241"] },
    { code: "30050", pastCode: "350", row: 4, column: 7, koName: "기초확률론", enName: "Elementary Probability Theory", courseId: "128", prereqs: ["250"], refs: ["242 Right Top"] },
    { code: "30055", pastCode: "355", row: 4, column: 8, koName: "수리통계학", enName: "Mathematical Statistics", courseId: "1492", prereqs: ["250"] },
    { code: "30064", pastCode: "364", row: 5, column: 9, koName: "행렬계산과 응용", enName: "Matrix Computation and Application", courseId: "8312" },
    { code: "30065", pastCode: "365", row: 5, column: 7, koName: "수치해석학개론", enName: "Introduction to Numerical Analysis", courseId: "129", prereqs: ["241 Right Top"] },
    { code: "40011", pastCode: "411", row: 7, column: 1, koName: "대수기하학개론", enName: "Introduction to Algebraic Geometry", courseId: "1506", prereqs: ["312"] },
    { code: "40012", pastCode: "412", row: 7, column: 2, koName: "가환대수학 입문", enName: "Introduction to Commutative Algebra", courseId: "23398", prereqs: ["312"] },
    { code: "40020", pastCode: "420", row: 6, column: 3, koName: "다양체해석학", enName: "Analysis on Manifolds", courseId: "119", prereqs: ["321"], refs: ["331"] },
    { code: "40030", pastCode: "430", row: 6, column: 4, koName: "조합적 위상수학", enName: "Combinatorial Topology", courseId: "1495", prereqs: ["331"] },
    { code: "40035", pastCode: "435", row: 7, column: 4, koName: "행렬군론", enName: "Matrix Groups", courseId: "120", prereqs: ["212 Right Left", "311 Right Left", "331 Bottom Left"], refs: ["430"] },
    { code: "40040", pastCode: "440", row: 6, column: 5, koName: "편미분방정식개론", enName: "Introduction to Partial Differential Equations", courseId: "110", prereqs: ["242"] },
    { code: "40041", pastCode: "441", row: 6, column: 6, koName: "르베그적분론", enName: "Lebesgue Integral Theory", courseId: "1496", prereqs: ["242"], refs: ["350 Left Top"] },
    { code: "40042", pastCode: "442", row: 7, column: 6, koName: "푸리에 해석과 응용", enName: "Fourier Analysis and Applications", courseId: "3914", refs: ["242 Bottom Right"] },
    { code: "40043", pastCode: "443", row: 7, column: 5, koName: "상미분방정식과 동역학계", enName: "Ordinary Differential Equations and Dynamical Systems", courseId: "135" },
    { code: "40056", pastCode: "456", row: 4, column: 9, koName: "컴퓨터 통계방법론", enName: "Statistical Methods with Computer", courseId: "3849", refs: ["355 Right Left"] },
    { code: "40073", pastCode: "473", row: 6, column: 8, koName: "수학과 인공지능 개론", enName: "Introduction to Artificial Intelligence with Mathematics", courseId: "23665" },
    { code: "40077", pastCode: "477", row: 3, column: 9, koName: "그래프이론 개론", enName: "Introduction to Graph Theory", courseId: "1500", prereqs: ["275"] }
];

const miniNodes = [
    { pastCode: "109", loc: "1313 523", prereqOf: ["355 Top Bottom", "364 Right Left", "473 Bottom Top"], refOf: ["365 Left Right"] },
    { pastCode: "202", loc: "833 523", refOf: ["341 Top Bottom", "440 Bottom Top"] }
];

const requiredCourses = ["212", "241", "311", "321", "331", "341", "355"];
const irregularCourses = ["364", "411", "412", "435", "442", "443", "456"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };
