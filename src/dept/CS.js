const nodeWidth = 130;
const nodeHeight = 65;
const posX = 160;
const posY = 120;

const courses = [
    { code: "10001", pastCode: "101", row: 1, column: 3, koName: "프로그래밍기초", enName: "Introduction to Programming", courseId: "744" },
    { code: "10009", pastCode: "109", row: 1, column: 1, koName: "프로그래밍 실습", enName: "Programming Practice", courseId: "763", prereqs: ["101 Left Right"] },
    { code: "20002", pastCode: "202", row: 3, column: 1, koName: "문제해결기법", enName: "Problem Solving", courseId: "774", prereqs: ["206", "300 Left Right"] },
    { code: "20004", pastCode: "204", row: 2, column: 2, koName: "이산구조", enName: "Discrete Mathematics", courseId: "745" },
    { code: "20006", pastCode: "206", row: 2, column: 1, koName: "데이타구조", enName: "Data Structure", courseId: "746", prereqs: ["101"], refs: ["109"] },
    { code: "20101", pastCode: "211", row: 2, column: 4, koName: "디지탈시스템 및 실험", enName: "Digital System and Lab", courseId: "752" },
    { code: "20200", pastCode: "220", row: 2, column: 3, koName: "프로그래밍의 이해", enName: "Programming Principles", courseId: "764", prereqs: ["101"] },
    { code: "20300", pastCode: "230", row: 2, column: 5, koName: "시스템프로그래밍", enName: "System Programming", courseId: "765", prereqs: ["101"] },
    { code: "20700", pastCode: "270", row: 2, column: 8, koName: "지능 로봇 설계 및 프로그래밍", enName: "Intelligent robot design and programming", courseId: "766", prereqs: ["101"] },
    { code: "30000", pastCode: "300", row: 3, column: 2, koName: "알고리즘 개론", enName: "Introduction to Algorithms", courseId: "747", prereqs: ["204", "206"] },
    { code: "30101", pastCode: "311", row: 3, column: 4, koName: "전산기조직", enName: "Computer Organization", courseId: "748", prereqs: ["230"], refs: ["211"] },
    { code: "30200", pastCode: "320", row: 3, column: 3, koName: "프로그래밍언어", enName: "Programming Language", courseId: "749", prereqs: ["204"], refs: ["220"] },
    { code: "30300", pastCode: "330", row: 3, column: 5, koName: "운영체제 및 실험", enName: "Operating Systems and Lab", courseId: "750", prereqs: ["230", "311"] },
    { code: "30401", pastCode: "341", row: 3, column: 6, koName: "전산망 개론", enName: "Introduction to Computer Networks", courseId: "775", prereqs: ["230"] },
    { code: "30408", pastCode: "348", row: 3, column: 7, koName: "정보보호개론", enName: "Introduction to Information Security", courseId: "23730", refs: ["341"] },
    { code: "30500", pastCode: "350", row: 5, column: 1, koName: "소프트웨어 공학 개론", enName: "Introduction to Software Engineering", courseId: "753" },
    { code: "30600", pastCode: "360", row: 5, column: 4, koName: "데이타베이스 개론", enName: "Introduction to Database", courseId: "754" },
    { code: "30701", pastCode: "371", row: 5, column: 5, koName: "딥러닝 개론", enName: "Introduction to Deep Learning", courseId: "24212", prereqs: ["376 Left Right"] },
    { code: "30702", pastCode: "372", row: 5, column: 7, koName: "파이썬을 통한 자연언어처리", enName: "Natural Language Processing with Python", courseId: "1303" },
    { code: "30704", pastCode: "374", row: 3, column: 8, koName: "인간-컴퓨터 상호작용 개론", enName: "Introduction to Human-Computer Interaction", courseId: "8289" },
    { code: "30705", pastCode: "484", row: 5, column: 8, koName: "컴퓨터 비전 개론", enName: "Introduction to Computer Vision", courseId: "24677" },
    { code: "30706", pastCode: "376", row: 5, column: 6, koName: "기계학습", enName: "Machine Learning", courseId: "16194" },
    { code: "30800", pastCode: "380", row: 3, column: 9, koName: "컴퓨터 그래픽스 개론", enName: "Introduction to Computer Graphics", courseId: "755" },
    { code: "40002", pastCode: "402", row: 4, column: 1, koName: "전산논리학개론", enName: "Introduction to Logic for Computer Science", courseId: "776", prereqs: ["300"] },
    { code: "40200", pastCode: "420", row: 4, column: 3, koName: "컴파일러설계", enName: "Compiler Design", courseId: "1298", prereqs: ["320"], refs: ["311 Left Right"] },
    { code: "40202", pastCode: "422", row: 4, column: 2, koName: "계산이론", enName: "Computation Theory", courseId: "1991", prereqs: ["300"] },
    { code: "40402", pastCode: "442", row: 4, column: 6, koName: "모바일 컴퓨팅과 응용", enName: "Mobile Computing and Applications", courseId: "768", refs: ["341"] },
    { code: "40407", pastCode: "447", row: 4, column: 7, koName: "웹 보안 공격 실습", enName: "Web Security Attack Laboratory", courseId: "23891", refs: ["341"] },
    { code: "40503", pastCode: "453", row: 6, column: 1, koName: "소프트웨어 테스팅 자동화 기법", enName: "Automated Software Testing", courseId: "1973", prereqs: ["350"] },
    { code: "40504", pastCode: "454", row: 5, column: 2, koName: "인공 지능 기반 소프트웨어 공학", enName: "Artificial Intelligence Based Software Engineering", courseId: "8343", prereqs: ["350"] },
    { code: "40507", pastCode: "457", row: 6, column: 2, koName: "스마트 환경을 위한 요구공학", enName: "Requirements Engineering for Smart Environments", courseId: "756", prereqs: ["350"] },
    { code: "40700", pastCode: "470", row: 6, column: 4, koName: "인공지능개론", enName: "Introduction to Artificial Intelligence", courseId: "1975" },
    { code: "40701", pastCode: "471", row: 6, column: 5, koName: "그래프 기계학습 및 마이닝", enName: "Graph Machine Learning and Mining", courseId: "23889", prereqs: ["376"] },
    { code: "40703", pastCode: "473", row: 4, column: 8, koName: "소셜 컴퓨팅 개론", enName: "Multi-Agent Engineering for Social Computing", courseId: "16195", prereqs: ["374"] },
    { code: "40705", pastCode: "475", row: 6, column: 7, koName: "자연언어처리를 위한 기계학습", enName: "Machine Learning for Natural Language Processing", courseId: "23396", refs: ["372", "376"] },
    { code: "40709", pastCode: "479", row: 6, column: 6, koName: "3차원 데이터를 위한 기계 학습", enName: "Machine Learning for 3D Data", courseId: "24076", refs: ["376"] },
    { code: "40802", pastCode: "482", row: 4, column: 9, koName: "대화형 컴퓨터그래픽스", enName: "Interactive Computer Graphics", courseId: "1977", prereqs: ["380"] },
    { code: "40805", pastCode: "485", row: 6, column: 8, koName: "컴퓨터비전을 위한 기계학습", enName: "Machine Learning for Computer Vision", courseId: "24078", prereqs: ["484"], refs: ["376"] },
    { code: "40809", pastCode: "489", row: 6, column: 9, koName: "컴퓨터윤리와사회문제", enName: "Computer Ethics & Social issues", courseId: "1978" }
];

const miniNodes = [];
const requiredCourses = ["204", "206", "300", "311", "320", "330"];
const irregularCourses = ["422", "442"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };
