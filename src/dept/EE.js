const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "20001", pastCode: "201", row: 1, column: 3, koName: "회로이론", enName: "Circuit Theory", courseId: "841" },
    { code: "20002", pastCode: "202", row: 4, column: 4, koName: "신호 및 시스템", enName: "Signals and Systems", courseId: "814" },
    { code: "20004", pastCode: "204", row: 1, column: 2, koName: "전기자기학 I", enName: "Electromagnetics I", courseId: "808" },
    { code: "20005", pastCode: "205", row: 1, column: 6, koName: "전자공학을 위한 자료구조 및 알고리듬", enName: "Data Structures and Algorithms for Electrical Engineering", courseId: "2013", refs: ["209 Left Right"] },
    { code: "20009", pastCode: "209", row: 1, column: 7, koName: "전자공학을 위한 프로그래밍 구조", enName: "Introduction to Programming and Computer Systems", courseId: "809" },
    { code: "20010", pastCode: "210", row: 4, column: 5, koName: "확률과 기초 확률과정", enName: "Probability and Introductory Random Processes", courseId: "842" },
    { code: "20011", pastCode: "211", row: 4, column: 1, koName: "물리전자개론", enName: "Introduction to Physical Electronics", courseId: "799" },
    { code: "20013", pastCode: "213", row: 4, column: 6, koName: "전자공학을 위한 이산 방법론", enName: "Discrete Methods for Electrical Engineering", courseId: "834" },
    { code: "20014", pastCode: "214", row: 4, column: 7, koName: "기계학습 기초와 실습", enName: "Machine Learning Basics and Practices", courseId: "23892" },
    { code: "30003", pastCode: "303", row: 2, column: 6, koName: "디지털시스템", enName: "Digital System Design", courseId: "835" },
    { code: "30004", pastCode: "304", row: 2, column: 3, koName: "전자회로", enName: "Electronic Circuits", courseId: "843", prereqs: ["201"] },
    { code: "30005", pastCode: "305", row: 2, column: 5, koName: "전자설계 및 실험", enName: "Introduction to Electronics Design Lab.", courseId: "2019", prereqs: ["303 Left Right", "304"], refs: ["202 Right Left", "204", "209"] },
    { code: "30009", pastCode: "309", row: 1, column: 8, koName: "전기공학을 위한 고급 프로그래밍 기술", enName: "Advanced Programming Techniques for Electrical Engineering", courseId: "23635", prereqs: ["209"] },
    { code: "30012", pastCode: "312", row: 2, column: 7, koName: "컴퓨터구조개론", enName: "Introduction to Computer Architecture", courseId: "2014", prereqs: ["209", "303"] },
    { code: "30021", pastCode: "321", row: 5, column: 4, koName: "통신공학", enName: "Communication Engineering", courseId: "810", prereqs: ["202"], refs: ["210"] },
    { code: "30023", pastCode: "323", row: 2, column: 8, koName: "컴퓨터 네트워크", enName: "Computer Network", courseId: "853", prereqs: ["209"] },
    { code: "30026", pastCode: "326", row: 5, column: 6, koName: "정보이론 및 부호화 개론", enName: "Introduction to Information Theory and Coding", courseId: "800", prereqs: ["210"], refs: ["321"] },
    { code: "30031", pastCode: "331", row: 5, column: 7, koName: "기계학습개론", enName: "Introduction to Machine Learning", courseId: "20654", prereqs: ["214"] },
    { code: "30041", pastCode: "341", row: 2, column: 1, koName: "전기자기학 II", enName: "Electromagnetics II", courseId: "844", prereqs: ["204"] },
    { code: "30042", pastCode: "342", row: 2, column: 2, koName: "무선공학", enName: "Radio Engineering", courseId: "2027", prereqs: ["204", "304 Left Right"], refs: ["341"] },
    { code: "30052", pastCode: "352", row: 3, column: 2, koName: "광공학개론", enName: "Fundamentals of Photonics", courseId: "21100", refs: ["342"] },
    { code: "30062", pastCode: "362", row: 5, column: 1, koName: "반도체소자", enName: "Semiconductor Devices", courseId: "823", prereqs: ["211"] },
    { code: "30081", pastCode: "381", row: 4, column: 3, koName: "제어시스템공학", enName: "Control System Engineering", courseId: "801", prereqs: ["202 Left Right"] },
    { code: "40003", pastCode: "403", row: 3, column: 3, koName: "아날로그 전자회로", enName: "Analog Electronic Circuits", courseId: "811", prereqs: ["304"] },
    { code: "40005", pastCode: "405", row: 3, column: 5, koName: "전자디자인 랩", enName: "Electronics Design Lab.", courseId: "798", prereqs: ["305"] },
    { code: "40012", pastCode: "412", row: 3, column: 6, koName: "빅데이터 분석 개론", enName: "Foundation of Big Data Analytics", courseId: "4837" },
    { code: "40014", pastCode: "414", row: 3, column: 7, koName: "임베디드시스템", enName: "Embedded Systems", courseId: "1994", prereqs: ["303", "312", "323"] },
    { code: "40015", pastCode: "415", row: 3, column: 8, koName: "전자공학을 위한 운영체제 및 시스템 프로그래밍", enName: "Operating Systems and System Programming for Electrical Engineering", courseId: "824", prereqs: ["312 Right Left"] },
    { code: "40024", pastCode: "424", row: 6, column: 5, koName: "최적화개론", enName: "Introduction to Optimization Techniques", courseId: "4838", refs: ["210"] },
    { code: "40032", pastCode: "432", row: 5, column: 3, koName: "디지털신호처리", enName: "Digital Signal Processing", courseId: "825", prereqs: ["202 Left Right"] },
    { code: "40041", pastCode: "441", row: 3, column: 1, koName: "광통신개론", enName: "Introduction to Fiber Optic Communication Systems", courseId: "846", refs: ["342"] },
    { code: "40053", pastCode: "453", row: 5, column: 2, koName: "광전자소자의 이해", enName: "Understanding of Optoelectronic Devices", courseId: "23813", prereqs: ["362"] },
    { code: "40063", pastCode: "463", row: 6, column: 1, koName: "반도체 집적회로 기술", enName: "Semiconductor IC Technology", courseId: "847", prereqs: ["362"] },
    { code: "40065", pastCode: "465", row: 6, column: 2, koName: "이종집적 반도체소자", enName: "Heterogeneously Integrated Semiconductor Devices", courseId: "23731", prereqs: ["362"] },
    { code: "40067", pastCode: "467", row: 1, column: 4, koName: "센서전자공학", enName: "Sensor Electronics", courseId: "23772", prereqs: ["201"] },
    { code: "40074", pastCode: "474", row: 6, column: 3, koName: "멀티미디어개론", enName: "Introduction to Multimedia", courseId: "802", refs: ["202 Left Right"] },
    { code: "40077", pastCode: "477", row: 6, column: 6, koName: "데이터베이스 및 빅데이터 시스템", enName: "Database and Big Data Systems", courseId: "23507" },
    { code: "40078", pastCode: "478", row: 6, column: 7, koName: "융합적 로봇공학 개론", enName: "Introduction to Multi-disciplinary Robotics", courseId: "23578" },
    { code: "40080", pastCode: "480", row: 6, column: 8, koName: "양자 정보 및 컴퓨팅 기초", enName: "Basics of Quantum Information and Quantum Computing", courseId: "23509" }
];

const miniNodes = [];
const requiredCourses = ["201", "202", "204", "209", "210", "211", "305", "405"];
const irregularCourses = [];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };
