const nodeWidth = 140;
const nodeHeight = 70;
const posX = 180;
const posY = 120;

const courses = [
    { code: "10041", pastCode: "141", row: 1, column: 1, koName: "일반물리학 I", enName: "General Physics I", courseId: "31" },
    { code: "10042", pastCode: "142", row: 1, column: 2, koName: "일반 물리학 II", enName: "General Physics II", courseId: "32" },
    { code: "10051", pastCode: "151", row: 1, column: 7, koName: "일반물리학실험Ⅰ", enName: "General Physics Lab. I", courseId: "34", refs: ["141 Top Top", "161 Top Top"] },
    { code: "10052", pastCode: "152", row: 1, column: 8, koName: "일반물리학실험Ⅱ", enName: "General Physics Lab. II", courseId: "33", refs: ["142 Top Top", "162 Top Top"] },
    { code: "10061", pastCode: "161", row: 1, column: 3, koName: "고급물리학 I", enName: "Advanced Physics I", courseId: "4" },
    { code: "10062", pastCode: "162", row: 1, column: 4, koName: "고급물리학 II", enName: "Advanced Physics II", courseId: "1428" },
    { code: "10071", pastCode: "171", row: 1, column: 5, koName: "실험 중심의 체감형 일반물리학 1", enName: "Experiment-Oriented General PhysicsⅠ", courseId: "21351" },
    { code: "10072", pastCode: "172", row: 1, column: 6, koName: "실험 중심의 체감형 일반물리학 2", enName: "Experiment-Oriented General Physics Ⅱ", courseId: "22926" },
    { code: "20011", pastCode: "211", row: 2, column: 4, koName: "수리물리학 I", enName: "Mathematical Methods in Physics I", courseId: "1421", prereqs: ["221", "231 Left Right"] },
    { code: "20012", pastCode: "212", row: 4, column: 4, koName: "수리물리학 II", enName: "Mathematical Methods in Physics II", courseId: "5", prereqs: ["211"] },
    { code: "20021", pastCode: "221", row: 2, column: 3, koName: "고전역학 I", enName: "Classical Mechanics I", courseId: "6", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "20022", pastCode: "222", row: 3, column: 3, koName: "고전역학Ⅱ", enName: "Classical Mechanics II", courseId: "1422", prereqs: ["221"] },
    { code: "20031", pastCode: "231", row: 2, column: 6, koName: "전자기학 I", enName: "Classical Electromagnetism I", courseId: "7", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "20032", pastCode: "232", row: 4, column: 6, koName: "전자기학Ⅱ", enName: "Classical Electromagnetism II", courseId: "1423", prereqs: ["231"] },
    { code: "20041", pastCode: "241", row: 2, column: 1, koName: "현대물리학", enName: "Modern Physics", courseId: "26", prereqs: ["141", "142", "161", "162", "171", "172"] },
    { code: "20042", pastCode: "242", row: 3, column: 1, koName: "체감형 현대물리", enName: "Experience-Oriented Modern Physics", courseId: "23859", prereqs: ["241"] },
    { code: "20051", pastCode: "251", row: 2, column: 7, koName: "물리학실험 I", enName: "Physics Lab. I", courseId: "39", prereqs: ["151", "152", "171", "172"] },
    { code: "30001", pastCode: "301", row: 4, column: 3, koName: "양자역학 I", enName: "Quantum Mechanics I", courseId: "8", prereqs: ["211", "222"] },
    { code: "30002", pastCode: "302", row: 5, column: 4, koName: "양자역학Ⅱ", enName: "Quantum Mechanics II", courseId: "1430", prereqs: ["212", "232", "301"] },
    { code: "30011", pastCode: "311", row: 3, column: 2, koName: "열물리학", enName: "Thermal Physics", courseId: "9" },
    { code: "30012", pastCode: "312", row: 4, column: 2, koName: "통계물리학", enName: "Statistical Physics", courseId: "1425", prereqs: ["222", "301 Left Right", "311"] },
    { code: "30051", pastCode: "351", row: 2, column: 8, koName: "물리학실험 III", enName: "Physics Lab. III", courseId: "10", prereqs: ["151", "152", "171", "172"] },
    { code: "30061", pastCode: "361", row: 5, column: 2, koName: "고체물리학Ⅰ", enName: "Solid State Physics I", courseId: "11", prereqs: ["301"], refs: ["312"] },
    { code: "30091", pastCode: "391", row: 5, column: 7, koName: "광학", enName: "Optics", courseId: "1427", prereqs: ["232"] },
    { code: "40001", pastCode: "401", row: 5, column: 3, koName: "원자.분자물리학", enName: "Atomic and Molecular Physics", courseId: "2545", prereqs: ["302 Left Right"] },
    { code: "40002", pastCode: "402", row: 6, column: 7, koName: "레이저광학", enName: "Laser Optics", courseId: "12", prereqs: ["391"] },
    { code: "40013", pastCode: "413", row: 6, column: 1, koName: "전산물리학개론", enName: "Computational Physics", courseId: "1064" },
    { code: "40030", pastCode: "430", row: 6, column: 8, koName: "생물물리학", enName: "Biophysics", courseId: "13" },
    { code: "40050", pastCode: "450", row: 6, column: 3, koName: "핵.소립자물리학", enName: "Nuclear and Elementary Particle Physics", courseId: "27", prereqs: ["302"] },
    { code: "40062", pastCode: "462", row: 6, column: 2, koName: "고체물리학 II", enName: "Solid State Physics II", courseId: "1062", prereqs: ["361"] },
    { code: "40065", pastCode: "465", row: 6, column: 4, koName: "물리학에서의 대칭성과 위상학", enName: "Symmetry and Topology in Physics", courseId: "23802", prereqs: ["302"] },
    { code: "40071", pastCode: "471", row: 6, column: 5, koName: "상대성이론및우주론", enName: "Theory of Relativity and Cosmology", courseId: "14", prereqs: ["212 Right Top", "222 Right Top", "232 Left Top"], refs: ["302"] },
    { code: "40075", pastCode: "475", row: 5, column: 6, koName: "양자 정보 I", enName: "Quantum Information I", courseId: "23496", prereqs: ["302"] },
    { code: "40076", pastCode: "476", row: 6, column: 6, koName: "양자 정보 II", enName: "Quantum Information II", courseId: "23573", prereqs: ["475"] }
];

const miniNodes = [];
const requiredCourses = ["221", "231", "251", "301", "302", "311", "351"];
const irregularCourses = [];

export default { nodeWidth, nodeHeight, posX, posY, courses, miniNodes, requiredCourses, irregularCourses };