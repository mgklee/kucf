const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "201", row: 1, column: 3, name: "회로이론", startCourseId: "841" },
    { code: "202", row: 4, column: 4, name: "신호 및 시스템", startCourseId: "814" },
    { code: "204", row: 1, column: 2, name: "전기자기학 I", startCourseId: "808" },
    { code: "205", row: 1, column: 6, name: "전자공학을 위한 자료구조 및 알고리듬", startCourseId: "2013", refs: ["209 Left Right"] },
    { code: "209", row: 1, column: 7, name: "전자공학을 위한 프로그래밍 구조", startCourseId: "809" },
    { code: "210", row: 4, column: 5, name: "확률과 기초 확률과정", startCourseId: "842" },
    { code: "211", row: 4, column: 1, name: "물리전자개론", startCourseId: "799" },
    { code: "213", row: 4, column: 6, name: "전자공학을 위한 이산 방법론", startCourseId: "834" },
    { code: "214", row: 4, column: 7, name: "기계학습 기초와 실습", startCourseId: "23892" },
    { code: "303", row: 2, column: 6, name: "디지털시스템", startCourseId: "835" },
    { code: "304", row: 2, column: 3, name: "전자회로", startCourseId: "843", prereqs: ["201"] },
    { code: "305", row: 2, column: 5, name: "전자설계 및 실험", startCourseId: "2019", prereqs: ["303 Left Right", "304"], refs: ["202 Right Left", "204", "209"] },
    { code: "309", row: 1, column: 8, name: "전기공학을 위한 고급 프로그래밍 기술", startCourseId: "23635", prereqs: ["209"] },
    { code: "312", row: 2, column: 7, name: "컴퓨터구조개론", startCourseId: "2014", prereqs: ["209", "303"] },
    { code: "321", row: 5, column: 4, name: "통신공학", startCourseId: "810", prereqs: ["202"], refs: ["210"] },
    { code: "323", row: 2, column: 8, name: "컴퓨터 네트워크", startCourseId: "853", prereqs: ["209"] },
    { code: "326", row: 6, column: 4, name: "정보이론 및 부호화 개론", startCourseId: "800", prereqs: ["210"], refs: ["321"] },
    { code: "331", row: 5, column: 7, name: "기계학습개론", startCourseId: "20654", prereqs: ["214"] },
    { code: "341", row: 2, column: 1, name: "전기자기학 II", startCourseId: "844", prereqs: ["204"] },
    { code: "342", row: 2, column: 2, name: "무선공학", startCourseId: "2027", prereqs: ["204", "304 Left Right"], refs: ["341"] },
    { code: "352", row: 3, column: 2, name: "광공학개론", startCourseId: "21100", refs: ["342"] },
    { code: "362", row: 5, column: 1, name: "반도체소자", startCourseId: "823", prereqs: ["211"] },
    { code: "372", row: 3, column: 4, name: "디지털 전자회로", startCourseId: "2755", prereqs: ["304 Right Top"] },
    { code: "381", row: 4, column: 3, name: "제어시스템공학", startCourseId: "801", prereqs: ["202 Left Right"] },
    { code: "403", row: 3, column: 3, name: "아날로그 전자회로", startCourseId: "811", prereqs: ["304"] },
    { code: "405", row: 3, column: 5, name: "전자디자인 랩", startCourseId: "798", prereqs: ["305"] },
    { code: "412", row: 6, column: 6, name: "빅데이터 분석 개론", startCourseId: "4837", prereqs: ["210"], refs: ["213"] },
    { code: "414", row: 3, column: 6, name: "임베디드시스템", startCourseId: "1994", prereqs: ["303"], refs: ["415 Left Right"] },
    { code: "415", row: 3, column: 7, name: "전자공학을 위한 운영체제 및 시스템 프로그래밍", startCourseId: "824", prereqs: ["312"] },
    { code: "424", row: 6, column: 5, name: "최적화개론", startCourseId: "4838", refs: ["210"] },
    { code: "432", row: 5, column: 3, name: "디지털신호처리", startCourseId: "825", prereqs: ["202 Left Right"] },
    { code: "441", row: 3, column: 1, name: "광통신개론", startCourseId: "846", refs: ["342"] },
    { code: "453", row: 5, column: 2, name: "광전자소자의 이해", startCourseId: "23813", prereqs: ["362"] },
    { code: "463", row: 6, column: 1, name: "반도체 집적회로 기술", startCourseId: "847", prereqs: ["362"] },
    { code: "465", row: 6, column: 2, name: "이종집적 반도체소자", startCourseId: "23731", prereqs: ["362"] },
    { code: "467", row: 1, column: 4, name: "센서전자공학", startCourseId: "23772", prereqs: ["201"] },
    { code: "474", row: 6, column: 3, name: "멀티미디어개론", startCourseId: "802", refs: ["202 Left Right"] },
    { code: "477", row: 6, column: 7, name: "데이터베이스 및 빅데이터 시스템", startCourseId: "23507", prereqs: ["412"] },
    { code: "478", row: 5, column: 8, name: "융합적 로봇공학 개론", startCourseId: "23578" },
    { code: "480", row: 6, column: 8, name: "양자 정보 및 컴퓨팅 기초", startCourseId: "23509" }
];

const miniNodes = [];
const requiredCourses = ["201", "202", "204", "209", "210", "211", "305", "405"];
const irregularCourses = ["372"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };