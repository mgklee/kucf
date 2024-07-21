const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "141", name: "일반물리학 I", row: 1, column: 1, startCourseId: "31" },
    { code: "142", name: "일반 물리학 II", row: 1, column: 2, startCourseId: "32" },
    { code: "151", name: "일반물리학실험Ⅰ", row: 1, column: 3, startCourseId: "34" },
    { code: "152", name: "일반물리학실험Ⅱ", row: 1, column: 4, startCourseId: "33" },
    { code: "161", name: "고급물리학 I", row: 1, column: 5, startCourseId: "4" },
    { code: "162", name: "고급물리학 II", row: 1, column: 6, startCourseId: "1428" },
    { code: "171", name: "실험 중심의 체감형 일반물리학 1", row: 1, column: 7, startCourseId: "21351" },
    { code: "172", name: "실험 중심의 체감형 일반물리학 2", row: 1, column: 8, startCourseId: "22926" },
    { code: "211", name: "수리물리학 I", row: 2, column: 4, startCourseId: "1421", prereqs: ["221", "231 Left Right"] },
    { code: "212", name: "수리물리학 II", row: 4, column: 4, startCourseId: "5", prereqs: ["211"] },
    { code: "221", name: "고전역학 I", row: 2, column: 3, startCourseId: "6" },
    { code: "222", name: "고전역학Ⅱ", row: 3, column: 3, startCourseId: "1422", prereqs: ["221"] },
    { code: "231", name: "전자기학 I", row: 2, column: 6, startCourseId: "7" },
    { code: "232", name: "전자기학Ⅱ", row: 4, column: 6, startCourseId: "1423", prereqs: ["231"] },
    { code: "241", name: "현대물리학", row: 2, column: 1, startCourseId: "26" },
    { code: "251", name: "물리학실험 I", row: 2, column: 8, startCourseId: "39" },
    { code: "301", name: "양자역학 I", row: 4, column: 3, startCourseId: "8", prereqs: ["211", "222"] },
    { code: "302", name: "양자역학Ⅱ", row: 5, column: 4, startCourseId: "1430", prereqs: ["212", "232", "301"] },
    { code: "311", name: "열물리학", row: 3, column: 2, startCourseId: "9" },
    { code: "312", name: "통계물리학", row: 4, column: 2, startCourseId: "1425", prereqs: ["222", "301 Left Right", "311"] },
    { code: "351", name: "물리학실험 III", row: 3, column: 8, startCourseId: "10" },
    { code: "361", name: "고체물리학Ⅰ", row: 5, column: 2, startCourseId: "11", prereqs: ["301"], refs: ["312"] },
    { code: "391", name: "광학", row: 5, column: 7, startCourseId: "1427", prereqs: ["232"] },
    { code: "401", name: "원자.분자물리학", row: 6, column: 3, startCourseId: "2545", prereqs: ["302"] },
    { code: "402", name: "레이저광학", row: 6, column: 7, startCourseId: "12", prereqs: ["391"] },
    { code: "413", name: "전산물리학개론", row: 5, column: 1, startCourseId: "1064" },
    { code: "430", name: "생물물리학", row: 6, column: 1, startCourseId: "13" },
    { code: "450", name: "핵.소립자물리학", row: 6, column: 4, startCourseId: "27", prereqs: ["302"] },
    { code: "462", name: "고체물리학 II", row: 6, column: 2, startCourseId: "1062", prereqs: ["361"] },
    { code: "465", name: "물리학에서의 대칭성과 위상학", row: 6, column: 8, startCourseId: "23802" },
    { code: "471", name: "상대성이론및우주론", row: 6, column: 5, startCourseId: "14", prereqs: ["212 Right Top", "222 Right Top", "232 Left Top"], refs: ["302"] },
    { code: "475", name: "양자 정보 I", row: 5, column: 6, startCourseId: "23496", prereqs: ["302"] },
    { code: "476", name: "양자 정보 II", row: 6, column: 6, startCourseId: "23573", prereqs: ["475"] }
];

const miniNodes = [];
const requiredCourses = ["221", "231", "251", "301", "302", "311", "351"];
const irregularCourses = ["430"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };