/** Format display metadata without changing the legacy identity used by the graph. */
export function formatCourseCode(department, course, codeFormat = "new") {
    return codeFormat === "new" && course.code !== null
        ? `${department}.${course.code}`
        : `${department}${course.pastCode}`;
}

export function formatCourseName(course, nameLanguage = "ko") {
    return nameLanguage === "en" && course.enName !== null ? course.enName : course.koName;
}

export function formatNodeText(node, { codeFormat = "new", nameLanguage = "ko" } = {}) {
    if (!node.department) return node.text;
    const code = formatCourseCode(node.department, node, codeFormat);
    return node.category === "mini" ? code : `${code}\n${formatCourseName(node, nameLanguage)}`;
}
