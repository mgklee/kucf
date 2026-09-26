/** courseId is the numeric OTL ID; courseKey identifies a course within the graph. */
export function dictionaryUrl(courseId) {
    const url = new URL("https://otl.kaist.ac.kr/dictionary");
    url.searchParams.set("courseId", courseId);
    return url.href;
}
