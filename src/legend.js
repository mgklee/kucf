import { createGraph } from "./graph.js";
import { createDiagram } from "./diagram-view.js";
import { loadGoJS } from "./gojs.js";
import { interfaceText } from "./interface-text.js";

export async function createLegend(preferences) {
    const nodeDataArray = [
        { key: "1", courseKey: "1", loc: "0 0", label: "legendCourse", alignment: "Left", fillColor: "white" },
        { key: "2", courseKey: "2", loc: "270 0", label: "legendCategory", alignment: "Center", fillColor: "#e6e6e6" },
        { key: "3", courseKey: "3", loc: "540 0", label: "legendSchedule", alignment: "Center", fillColor: "white", strokeDashArray: [10, 10] }
    ];
    const linkDataArray = [
        { id: "prerequisite", from: "1", to: "2", fromCourseKey: "1", toCourseKey: "2", kind: "prerequisite", label: "prerequisite" },
        { id: "reference", from: "2", to: "3", fromCourseKey: "2", toCourseKey: "3", kind: "reference", strokeDashArray: [10, 10], label: "reference" }
    ];
    const go = await loadGoJS();
    await document.fonts.ready;
    const text = interfaceText(preferences.nameLanguage);
    for (const item of [...nodeDataArray, ...linkDataArray]) item.text = text[item.label];
    const view = createDiagram(go, {
        container: "myDiagramDiv",
        model: {
            nodeDataArray, linkDataArray,
            graph: createGraph(nodeDataArray.map(node => node.courseKey), linkDataArray)
        },
        nodeWidth: 170, nodeHeight: 90, legend: true, theme: preferences.theme
    });
    return {
        setPreferences(preferences) {
            const text = interfaceText(preferences.nameLanguage);
            view.setTheme(preferences.theme);
            view.diagram.commit(() => {
                for (const item of [...nodeDataArray, ...linkDataArray]) {
                    view.diagram.model.setDataProperty(item, "text", text[item.label]);
                }
            }, null);
        }
    };
}
