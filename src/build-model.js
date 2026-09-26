import { createGraph } from "./graph.js";
import { formatNodeText } from "./course-label.js";

const SIDES = new Set(["Top", "Right", "Bottom", "Left"]);
const PAST_COURSE_CODE = /^[A-Za-z0-9]+$/;

/** Validate the existing department format and build renderer-independent data. */
export function buildModel(deptCode, data) {
    const fail = (path, message) => {
        throw new Error(`${deptCode}: ${path}: ${message}`);
    };
    const object = (value, path) => {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            fail(path, "expected an object");
        }
    };
    const array = (value, path) => {
        if (!Array.isArray(value)) fail(path, "expected an array");
    };
    const pastCode = (value, path) => {
        if (typeof value !== "string" || !PAST_COURSE_CODE.test(value)) {
            fail(path, "expected a nonempty course code containing letters or digits");
        }
    };
    const finite = (value, path, positive = false) => {
        if (typeof value !== "number" || !Number.isFinite(value) || (positive && value <= 0)) {
            fail(path, `expected a finite ${positive ? "positive " : ""}number`);
        }
    };

    if (typeof deptCode !== "string" || !/^[A-Z][A-Z0-9]*$/.test(deptCode)) {
        fail("department", "expected an uppercase department code");
    }
    object(data, "data");
    for (const field of ["nodeWidth", "nodeHeight", "posX", "posY"]) {
        finite(data[field], field, true);
    }
    for (const field of ["courses", "miniNodes", "requiredCourses", "irregularCourses"]) {
        array(data[field], field);
    }

    const coursesByPastCode = new Map();
    const currentCodes = new Set();
    data.courses.forEach((course, index) => {
        const path = `courses[${index}]`;
        object(course, path);
        pastCode(course.pastCode, `${path}.pastCode`);
        const coursePath = `${path} (${deptCode}${course.pastCode})`;
        if (coursesByPastCode.has(course.pastCode)) fail(coursePath, `duplicate course code ${course.pastCode}`);
        if (course.code !== null && (typeof course.code !== "string" || !/^\d{5}$/.test(course.code))) {
            fail(`${coursePath}.code`, "expected a five-digit course code as a string, or null");
        }
        if (course.code !== null) {
            if (currentCodes.has(course.code)) fail(`${coursePath}.code`, `duplicate current course code ${course.code}`);
            currentCodes.add(course.code);
        }
        if (typeof course.koName !== "string" || course.koName.trim().length === 0) {
            fail(`${coursePath}.koName`, "expected a nonempty Korean course name");
        }
        if (course.enName !== null && (typeof course.enName !== "string" || course.enName.trim().length === 0)) {
            fail(`${coursePath}.enName`, "expected a nonempty English course name, or null");
        }
        if (typeof course.courseId !== "string" || !/^[1-9]\d*$/.test(course.courseId)) {
            fail(`${coursePath}.courseId`, "expected a positive integer ID as a string");
        }
        for (const field of ["row", "column"]) finite(course[field], `${coursePath}.${field}`);
        finite(course.column * data.posX, `${coursePath}.column * posX`);
        finite(course.row * data.posY, `${coursePath}.row * posY`);
        coursesByPastCode.set(course.pastCode, course);
    });

    const knownCourse = (value, path) => {
        pastCode(value, path);
        if (!coursesByPastCode.has(value)) fail(path, `unknown course ${deptCode}${value}`);
    };
    const memberships = {};
    for (const field of ["requiredCourses", "irregularCourses"]) {
        memberships[field] = new Set();
        data[field].forEach((value, index) => {
            const path = `${field}[${index}]`;
            knownCourse(value, path);
            if (memberships[field].has(value)) fail(path, `duplicate course code ${value}`);
            memberships[field].add(value);
        });
    }

    const nodeDataArray = [];
    const linkDataArray = [];
    const nodeKeys = new Set(coursesByPastCode.keys());
    const courseKey = value => `${deptCode}${value}`;

    function addRelations(owner, ownerPath, field, kind, isMini = false) {
        if (owner[field] === undefined) return;
        array(owner[field], `${ownerPath}.${field}`);
        owner[field].forEach((value, index) => {
            const path = `${ownerPath}.${field}[${index}]`;
            if (typeof value !== "string" || value.trim().length === 0) {
                fail(path, "expected a course code or 'code Side Side'");
            }
            const parts = value.trim().split(/\s+/);
            if (parts.length !== 3 && (isMini || parts.length !== 1)) {
                fail(path, isMini ? "expected 'code Side Side' for a mini node" : "expected a course code or 'code Side Side'");
            }
            const [otherCode, fromSide, toSide] = parts;
            knownCourse(otherCode, path);
            if (parts.length === 3 && (!SIDES.has(fromSide) || !SIDES.has(toSide))) {
                fail(path, "connection sides must be Top, Right, Bottom, or Left");
            }
            const sameRow = owner.row === coursesByPastCode.get(otherCode).row;
            const link = {
                from: isMini ? `${owner.pastCode}m` : otherCode,
                to: isMini ? otherCode : owner.pastCode,
                fromSpot: fromSide || (sameRow ? "Right" : "Bottom"),
                toSpot: toSide || (sameRow ? "Left" : "Top")
            };
            if (kind === "reference") link.strokeDashArray = [10, 10];
            link.id = `${deptCode}:${isMini ? "miniNodes" : "courses"}:${owner.pastCode}:${field}:${index}`;
            link.fromCourseKey = courseKey(isMini ? owner.pastCode : otherCode);
            link.toCourseKey = courseKey(isMini ? otherCode : owner.pastCode);
            link.kind = kind;
            linkDataArray.push(link);
        });
    }

    data.courses.forEach((course, index) => {
        nodeDataArray.push({
            category: "node",
            key: course.pastCode,
            loc: `${course.column * data.posX} ${course.row * data.posY}`,
            text: formatNodeText({ department: deptCode, ...course }),
            department: deptCode,
            pastCode: course.pastCode,
            code: course.code,
            koName: course.koName,
            enName: course.enName,
            // This is display membership, not an AND/OR graduation requirement.
            fillColor: memberships.requiredCourses.has(course.pastCode) ? "#e6e6e6" : "white",
            courseId: course.courseId,
            strokeDashArray: memberships.irregularCourses.has(course.pastCode) ? [10, 10] : null,
            courseKey: courseKey(course.pastCode)
        });
        const path = `courses[${index}] (${courseKey(course.pastCode)})`;
        addRelations(course, path, "prereqs", "prerequisite");
        addRelations(course, path, "refs", "reference");
    });

    data.miniNodes.forEach((mini, index) => {
        const path = `miniNodes[${index}]`;
        object(mini, path);
        knownCourse(mini.pastCode, `${path}.pastCode`);
        const miniPath = `${path} (${courseKey(mini.pastCode)})`;
        const key = `${mini.pastCode}m`;
        if (nodeKeys.has(key)) fail(miniPath, `duplicate diagram node key ${key}`);
        nodeKeys.add(key);
        const point = typeof mini.loc === "string" ? mini.loc.trim().split(/\s+/) : [];
        if (point.length !== 2 || point.some(value => !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value) || !Number.isFinite(Number(value)))) {
            fail(`${miniPath}.loc`, "expected two finite coordinates, e.g. '1320 523'");
        }
        const course = coursesByPastCode.get(mini.pastCode);
        nodeDataArray.push({
            category: "mini",
            key,
            loc: mini.loc,
            text: formatNodeText({ department: deptCode, ...course, category: "mini" }),
            department: deptCode,
            pastCode: course.pastCode,
            code: course.code,
            koName: course.koName,
            enName: course.enName,
            courseKey: courseKey(mini.pastCode)
        });
        addRelations(mini, miniPath, "prereqOf", "prerequisite", true);
        addRelations(mini, miniPath, "refOf", "reference", true);
    });

    const graph = createGraph([...coursesByPastCode.keys()].map(courseKey), linkDataArray);
    return { nodeDataArray, linkDataArray, graph };
}
