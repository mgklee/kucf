import PH from "./dept/PH.js";
import MAS from "./dept/MAS.js";
import CH from "./dept/CH.js";
import EE from "./dept/EE.js";
import CS from "./dept/CS.js";

export const departments = [
    { code: "PH", data: PH },
    { code: "MAS", data: MAS },
    { code: "CH", data: CH },
    { code: "EE", data: EE },
    { code: "CS", data: CS }
];

const departmentsByCode = new Map(departments.map(department => [department.code, department]));

export function getDepartment(code) {
    return departmentsByCode.get(code);
}
