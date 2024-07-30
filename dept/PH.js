const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "141", row: 1, column: 1, name: "일반물리학 I", startCourseId: "31" },
    { code: "142", row: 1, column: 2, name: "일반 물리학 II", startCourseId: "32" },
    { code: "151", row: 1, column: 7, name: "일반물리학실험Ⅰ", startCourseId: "34", refs: ["141 Top Top", "161 Top Top"] },
    { code: "152", row: 1, column: 8, name: "일반물리학실험Ⅱ", startCourseId: "33", refs: ["142 Top Top", "162 Top Top"] },
    { code: "161", row: 1, column: 3, name: "고급물리학 I", startCourseId: "4" },
    { code: "162", row: 1, column: 4, name: "고급물리학 II", startCourseId: "1428" },
    { code: "171", row: 1, column: 5, name: "실험 중심의 체감형 일반물리학 1", startCourseId: "21351" },
    { code: "172", row: 1, column: 6, name: "실험 중심의 체감형 일반물리학 2", startCourseId: "22926" },
    { code: "211", row: 2, column: 4, name: "수리물리학 I", startCourseId: "1421", prereqs: ["221", "231 Left Right"] },
    { code: "212", row: 4, column: 4, name: "수리물리학 II", startCourseId: "5", prereqs: ["211"] },
    { code: "221", row: 2, column: 3, name: "고전역학 I", startCourseId: "6", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "222", row: 3, column: 3, name: "고전역학Ⅱ", startCourseId: "1422", prereqs: ["221"] },
    { code: "231", row: 2, column: 6, name: "전자기학 I", startCourseId: "7", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "232", row: 4, column: 6, name: "전자기학Ⅱ", startCourseId: "1423", prereqs: ["231"] },
    { code: "241", row: 2, column: 1, name: "현대물리학", startCourseId: "26", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "242", row: 3, column: 1, name: "체감형 현대물리", startCourseId: "23859", prereqs: ["241"] },
    { code: "251", row: 2, column: 7, name: "물리학실험 I", startCourseId: "39", prereqs: ["151", "152", "171", "172"] },
    { code: "301", row: 4, column: 3, name: "양자역학 I", startCourseId: "8", prereqs: ["211", "222"] },
    { code: "302", row: 5, column: 4, name: "양자역학Ⅱ", startCourseId: "1430", prereqs: ["212", "232", "301"] },
    { code: "311", row: 3, column: 2, name: "열물리학", startCourseId: "9" },
    { code: "312", row: 4, column: 2, name: "통계물리학", startCourseId: "1425", prereqs: ["222", "301 Left Right", "311"] },
    { code: "351", row: 2, column: 8, name: "물리학실험 III", startCourseId: "10", prereqs: ["151", "152", "171", "172"] },
    { code: "361", row: 5, column: 2, name: "고체물리학Ⅰ", startCourseId: "11", prereqs: ["301"], refs: ["312"] },
    { code: "391", row: 5, column: 7, name: "광학", startCourseId: "1427", prereqs: ["232"] },
    { code: "401", row: 5, column: 3, name: "원자.분자물리학", startCourseId: "2545", prereqs: ["302 Left Right"] },
    { code: "402", row: 6, column: 7, name: "레이저광학", startCourseId: "12", prereqs: ["391"] },
    { code: "413", row: 6, column: 1, name: "전산물리학개론", startCourseId: "1064" },
    { code: "430", row: 6, column: 8, name: "생물물리학", startCourseId: "13" },
    { code: "450", row: 6, column: 3, name: "핵.소립자물리학", startCourseId: "27", prereqs: ["302"] },
    { code: "462", row: 6, column: 2, name: "고체물리학 II", startCourseId: "1062", prereqs: ["361"] },
    { code: "465", row: 6, column: 4, name: "물리학에서의 대칭성과 위상학", startCourseId: "23802", prereqs: ["302"] },
    { code: "471", row: 6, column: 5, name: "상대성이론및우주론", startCourseId: "14", prereqs: ["212 Right Top", "222 Right Top", "232 Left Top"], refs: ["302"] },
    { code: "475", row: 5, column: 6, name: "양자 정보 I", startCourseId: "23496", prereqs: ["302"] },
    { code: "476", row: 6, column: 6, name: "양자 정보 II", startCourseId: "23573", prereqs: ["475"] }
];

const miniNodes = [];
const requiredCourses = ["221", "231", "251", "301", "302", "311", "351"];
const irregularCourses = ["430"];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };