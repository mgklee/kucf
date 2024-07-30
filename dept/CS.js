const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 120;

const courses = [
    { code: "101", row: 1, column: 3, name: "프로그래밍기초", startCourseId: "744" },
    { code: "109", row: 1, column: 2, name: "프로그래밍 실습", startCourseId: "763", prereqs: ["101 Left Right"] },
    { code: "202", row: 1, column: 4, name: "문제해결기법", startCourseId: "774", prereqs: ["101"] },
    { code: "204", row: 2, column: 2, name: "이산구조", startCourseId: "745" },
    { code: "206", row: 2, column: 1, name: "데이타구조", startCourseId: "746", prereqs: ["101"], refs: ["109 Left Top"] },
    { code: "211", row: 2, column: 4, name: "디지탈시스템 및 실험", startCourseId: "752" },
    { code: "220", row: 2, column: 3, name: "프로그래밍의 이해", startCourseId: "764", prereqs: ["101"] },
    { code: "230", row: 2, column: 5, name: "시스템프로그래밍", startCourseId: "765", prereqs: ["101"] },
    { code: "270", row: 2, column: 7, name: "지능 로봇 설계 및 프로그래밍", startCourseId: "766", prereqs: ["101"] },
    { code: "300", row: 3, column: 1, name: "알고리즘 개론", startCourseId: "747", prereqs: ["204", "206"] },
    { code: "311", row: 3, column: 4, name: "전산기조직", startCourseId: "748", prereqs: ["211", "230"] },
    { code: "320", row: 3, column: 3, name: "프로그래밍언어", startCourseId: "749", prereqs: ["204"], refs: ["220"] },
    { code: "330", row: 3, column: 5, name: "운영체제 및 실험", startCourseId: "750", prereqs: ["230", "311"] },
    { code: "341", row: 5, column: 4, name: "전산망 개론", startCourseId: "775", prereqs: ["230 Left Right"] },
    { code: "348", row: 5, column: 5, name: "정보보호개론", startCourseId: "23730", refs: ["341"] },
    { code: "350", row: 5, column: 1, name: "소프트웨어 공학 개론", startCourseId: "753" },
    { code: "360", row: 3, column: 6, name: "데이타베이스 개론", startCourseId: "754" },
    { code: "371", row: 3, column: 7, name: "딥러닝 개론", startCourseId: "24212", prereqs: ["376 Left Right"] },
    { code: "372", row: 3, column: 9, name: "파이썬을 통한 자연언어처리", startCourseId: "1303" },
    { code: "374", row: 5, column: 6, name: "인간-컴퓨터 상호작용 개론", startCourseId: "8289" },
    { code: "376", row: 3, column: 8, name: "기계학습", startCourseId: "16194" },
    { code: "380", row: 5, column: 7, name: "컴퓨터 그래픽스 개론", startCourseId: "755" },
    { code: "402", row: 4, column: 1, name: "전산논리학개론", startCourseId: "776", prereqs: ["300"] },
    { code: "411", row: 4, column: 4, name: "인공지능을 위한 시스템", startCourseId: "24079", prereqs: ["311"] },
    { code: "420", row: 4, column: 3, name: "컴파일러설계", startCourseId: "1298", prereqs: ["320"], refs: ["311 Left Right"] },
    { code: "422", row: 4, column: 2, name: "계산이론", startCourseId: "1991", prereqs: ["300"] },
    { code: "431", row: 4 ,column: 5, name: "동시성 프로그래밍", startCourseId: "23572", prereqs: ["320", "330"] },
    { code: "442", row: 6, column: 4, name: "모바일 컴퓨팅과 응용", startCourseId: "768", refs: ["341"] },
    { code: "447", row: 6, column: 5, name: "웹 보안 공격 실습", startCourseId: "23891", refs: ["341"] },
    { code: "453", row: 6, column: 1, name: "소프트웨어 테스팅 자동화 기법", startCourseId: "1973", prereqs: ["350"] },
    { code: "454", row: 5, column: 2, name: "인공 지능 기반 소프트웨어 공학", startCourseId: "8343", prereqs: ["350"] },
    { code: "457", row: 6, column: 2, name: "스마트 환경을 위한 요구공학", startCourseId: "756", refs: ["350"] },
    { code: "459", row: 6, column: 3, name: "서비스 컴퓨팅 개론", startCourseId: "1974", refs: ["350"] },
    { code: "470", row: 4, column: 6, name: "인공지능개론", startCourseId: "1975" },
    { code: "471", row: 4, column: 7, name: "그래프 기계학습 및 마이닝", startCourseId: "23889", prereqs: ["376"] },
    { code: "473", row: 6, column: 6, name: "소셜 컴퓨팅 개론", startCourseId: "16195", prereqs: ["374"] },
    { code: "475", row: 4, column: 9, name: "자연언어처리를 위한 기계학습", startCourseId: "23396", refs: ["372", "376"] },
    { code: "479", row: 4, column: 8, name: "3차원 데이터를 위한 기계 학습", startCourseId: "24076", refs: ["376"] },
    { code: "482", row: 6, column: 7, name: "대화형 컴퓨터그래픽스", startCourseId: "1977", prereqs: ["380"] },
    { code: "484", row: 5, column: 8, name: "컴퓨터 비전 개론", startCourseId: "4540" },
    { code: "485", row: 6, column: 8, name: "컴퓨터비전을 위한 기계학습", startCourseId: "24078", prereqs: ["484"] },
    { code: "489", row: 6, column: 9, name: "컴퓨터윤리와사회문제", startCourseId: "1978" }
];

const miniNodes = [];
const requiredCourses = ["204", "206", "300", "311", "320", "330"];
const irregularCourses = ["422", "442"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };