/** Build adjacency indexes using course identities, independently of diagram nodes. */
export function createGraph(courseKeys, relations) {
    const ids = new Set(courseKeys);
    const incoming = new Map([...ids].map(id => [id, []]));
    const outgoing = new Map([...ids].map(id => [id, []]));
    const relationIds = new Set();

    for (const relation of relations) {
        const { id, fromCourseKey, toCourseKey, kind } = relation;
        if (typeof id !== "string" || id.length === 0 || relationIds.has(id)) {
            throw new Error(`Invalid or duplicate relation ID: ${id}`);
        }
        if (!ids.has(fromCourseKey) || !ids.has(toCourseKey)) {
            throw new Error(`Relation ${id} refers to an unknown course`);
        }
        relationIds.add(id);
        const edge = { id, fromCourseKey, toCourseKey, kind };
        outgoing.get(fromCourseKey).push(edge);
        incoming.get(toCourseKey).push(edge);
    }

    return { courseKeys: ids, incoming, outgoing };
}

/**
 * Find ancestors and descendants, following each direction separately.
 * Switching direction midway would also select siblings and unrelated co-parents.
 */
export function collectRelated(graph, courseKey) {
    const courseKeys = new Set();
    const relationIds = new Set();
    if (!graph.courseKeys.has(courseKey)) return { courseKeys, relationIds };

    courseKeys.add(courseKey);
    for (const [adjacency, endpoint] of [
        [graph.incoming, "fromCourseKey"],
        [graph.outgoing, "toCourseKey"]
    ]) {
        const visited = new Set([courseKey]);
        const pending = [courseKey];
        while (pending.length > 0) {
            const current = pending.pop();
            for (const relation of adjacency.get(current)) {
                relationIds.add(relation.id);
                const next = relation[endpoint];
                courseKeys.add(next);
                if (!visited.has(next)) {
                    visited.add(next);
                    pending.push(next);
                }
            }
        }
    }

    return { courseKeys, relationIds };
}
