const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 120;

const courses = [
    { code: "101", name: "프로그래밍기초", row: 1, column: 3, startCourseId: "744" },
    { code: "202", name: "문제해결기법", row: 1, column: 4, startCourseId: "774", prereqs: ["101"] },
    { code: "204", name: "이산구조", row: 2, column: 2, startCourseId: "745" },
    { code: "206", name: "데이타구조", row: 2, column: 1, startCourseId: "746", prereqs: ["101"] },
    { code: "211", name: "디지탈시스템 및 실험", row: 2, column: 4, startCourseId: "752" },
    { code: "220", name: "프로그래밍의 이해", row: 2, column: 3, startCourseId: "764", prereqs: ["101"] },
    { code: "230", name: "시스템프로그래밍", row: 2, column: 5, startCourseId: "765", prereqs: ["101"] },
    { code: "270", name: "지능 로봇 설계 및 프로그래밍", row: 2, column: 7, startCourseId: "766", prereqs: ["101"] },
    { code: "300", name: "알고리즘 개론", row: 3, column: 1, startCourseId: "747", prereqs: ["204", "206"] },
    { code: "311", name: "전산기조직", row: 3, column: 4, startCourseId: "748", prereqs: ["211", "230"] },
    { code: "320", name: "프로그래밍언어", row: 3, column: 3, startCourseId: "749", prereqs: ["204"], refs: ["220"] },
    { code: "330", name: "운영체제 및 실험", row: 3, column: 5, startCourseId: "750", prereqs: ["230", "311"] },
    { code: "341", name: "전산망 개론", row: 3, column: 6, startCourseId: "775", prereqs: ["230"] },
    { code: "350", name: "소프트웨어 공학 개론", row: 5, column: 6, startCourseId: "753" },
    { code: "360", name: "데이타베이스 개론", row: 2, column: 9, startCourseId: "754" },
    { code: "372", name: "파이썬을 통한 자연언어처리", row: 3, column: 9, startCourseId: "1303" },
    { code: "374", name: "인간-컴퓨터 상호작용 개론", row: 5, column: 1, startCourseId: "8289" },
    { code: "376", name: "기계학습", row: 3, column: 7, startCourseId: "16194" },
    { code: "380", name: "컴퓨터 그래픽스 개론", row: 5, column: 2, startCourseId: "755" },
    { code: "402", name: "전산논리학개론", row: 4, column: 1, startCourseId: "776", prereqs: ["300"] },
    { code: "409", name: "산학협업 소프트웨어 프로젝트", row: 6, column: 5, startCourseId: "767" },
    { code: "411", name: "인공지능을 위한 시스템", row: 4, column: 4, startCourseId: "24079", prereqs: ["311"] },
    { code: "420", name: "컴파일러설계", row: 4, column: 3, startCourseId: "1298", prereqs: ["320"], refs: ["311 Left Right"] },
    { code: "422", name: "계산이론", row: 4, column: 2, startCourseId: "1991", prereqs: ["300"] },
    { code: "431", name: "동시성 프로그래밍", row: 4 ,column: 5, startCourseId: "23572", prereqs: ["320", "330"] },
    { code: "442", name: "모바일 컴퓨팅과 응용", row: 4, column: 6, startCourseId: "768", refs: ["341"] },
    // { code: "448", name: "정보보호개론", row: 5, column: 5, startCourseId: "769", refs: ["341"] },
    { code: "453", name: "소프트웨어 테스팅 자동화 기법", row: 6, column: 6, startCourseId: "1973", prereqs: ["350"] },
    { code: "454", name: "인공 지능 기반 소프트웨어 공학", row: 5, column: 7, startCourseId: "8343", prereqs: ["350"], refs: ["470"] },
    { code: "457", name: "스마트 환경을 위한 요구공학", row: 6, column: 7, startCourseId: "756" },
    { code: "459", name: "서비스 컴퓨팅 개론", row: 6, column: 8, startCourseId: "1974" },
    { code: "470", name: "인공지능개론", row: 4, column: 7, startCourseId: "1975", refs: ["376"] },
    { code: "473", name: "소셜 컴퓨팅 개론", row: 6, column: 1, startCourseId: "16195", prereqs: ["374"] },
    { code: "474", name: "텍스트마이닝", row: 4, column: 8, startCourseId: "4417", prereqs: ["372 Left Top"], refs: ["376 Right Top"] },
    { code: "475", name: "자연언어처리를 위한 기계학습", row: 4, column: 9, startCourseId: "23396", prereqs: ["372"], refs: ["376"] },
    { code: "482", name: "대화형 컴퓨터그래픽스", row: 6, column: 2, startCourseId: "1977", prereqs: ["380"] },
    { code: "484", name: "컴퓨터 비전 개론", row: 5, column: 9, startCourseId: "4540" },
    { code: "489", name: "컴퓨터윤리와사회문제", row: 6, column: 9, startCourseId: "1978" }
];

const miniNodes = [];
const requiredCourses = ["204", "206", "300", "311", "320", "330"];
const irregularCourses = ["211", "422", "442", "448", "474"];
// const certInAICourses = ["270", "372", "376", "423", "454", "470", "474", "484"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };