import { collectRelated } from "./graph.js";
import { formatNodeText } from "./course-label.js";

const THEMES = {
    light: {
        highlight: "#1487c8", accent: "#004191", text: "black", line: "black",
        background: "white", node: "white", required: "#e6e6e6", highlightText: "white"
    },
    dark: {
        highlight: "#176c9e", accent: "#8acbff", text: "#e5edf6", line: "#a4b5c9",
        background: "#101720", node: "#172230", required: "#304257", highlightText: "white"
    }
};

function createCourseFontFitter(go, width, height) {
    const textBlock = new go.TextBlock({ width, spacingAbove: 1, spacingBelow: 1 });
    const measurement = new go.Part("Position").add(textBlock);
    const fonts = new Map();
    return text => {
        if (fonts.has(text)) return fonts.get(text);
        textBlock.text = text;
        // Rewrap at each font size to use the full box width before scaling.
        for (let size = 12; size >= 1; size -= 0.25) {
            textBlock.font = `${size}px Noto Sans KR`;
            measurement.ensureBounds();
            if (textBlock.naturalBounds.height <= height) break;
        }
        fonts.set(text, textBlock.font);
        return textBlock.font;
    };
}

function measureMiniCodeSize(go, nodes, font) {
    const size = new go.Size(48, 17);
    const textBlock = new go.TextBlock({ font, wrap: go.Wrap.None });
    const measurement = new go.Part("Position").add(textBlock);
    for (const node of nodes) {
        if (node.category !== "mini") continue;
        for (const codeFormat of ["past", "new"]) {
            textBlock.text = formatNodeText(node, { codeFormat });
            measurement.ensureBounds();
            size.width = Math.max(size.width, textBlock.naturalBounds.width);
            size.height = Math.max(size.height, textBlock.naturalBounds.height);
        }
    }
    return size;
}

/** GoJS stays at this boundary; model construction and traversal use plain data. */
export function createDiagram(go, {
    container,
    model,
    nodeWidth,
    nodeHeight,
    legend = false,
    onOpenCourse,
    theme = "light",
    displayPreferences = { codeFormat: "new", nameLanguage: "ko" }
}) {
    const $ = go.GraphObject.make;
    let colors = theme === "dark" ? THEMES.dark : THEMES.light;
    const alignment = legend ? go.Spot.Bottom : go.Spot.Center;
    const diagram = $(go.Diagram, container, {
        isReadOnly: true,
        allowSelect: false,
        allowZoom: !legend,
        contentAlignment: alignment,
        autoScale: legend ? go.AutoScale.Uniform : go.AutoScale.None,
        initialAutoScale: go.AutoScale.Uniform,
        initialContentAlignment: alignment,
        padding: legend ? 5 : new go.Margin(80, 16, 16, 16),
        "toolManager.mouseWheelBehavior": legend ? go.ToolManager.WheelNone : go.ToolManager.WheelZoom
    });

    let hoveredCourseKey = null;

    function paintNode(node) {
        const shape = node.findObject("SHAPE");
        const text = node.findObject("TEXT");
        const mini = node.data.category === "mini";
        shape.fill = mini ? colors.background : node.isHighlighted ? colors.highlight
            : node.data.fillColor === "#e6e6e6" ? colors.required : colors.node;
        shape.stroke = mini ? colors.background : node.isHighlighted ? colors.accent : colors.line;
        shape.strokeDashArray = node.isHighlighted ? null : node.data.strokeDashArray ?? null;
        text.stroke = node.isHighlighted ? (mini ? colors.accent : colors.highlightText) : colors.text;
        if (node.toolTip) {
            node.toolTip.findObject("TIP_BACKGROUND").fill = colors.node;
            node.toolTip.findObject("TIP_BACKGROUND").stroke = colors.line;
            node.toolTip.findObject("TIP_TEXT").stroke = colors.text;
        }
    }

    function paintLink(link) {
        const color = link.isHighlighted ? colors.accent : colors.line;
        link.findObject("LINE").stroke = color;
        link.findObject("ARROW").fill = color;
        link.findObject("ARROW").stroke = color;
        const text = link.findObject("TEXT");
        if (text) text.stroke = color;
    }

    function updateHighlight() {
        const related = collectRelated(model.graph, hoveredCourseKey);
        diagram.commit(() => {
            diagram.clearHighlighteds();
            diagram.nodes.each(node => {
                node.isHighlighted = related.courseKeys.has(node.data.courseKey);
                paintNode(node);
            });
            diagram.links.each(link => {
                link.isHighlighted = related.relationIds.has(link.data.id);
                paintLink(link);
            });
        }, null);
    }

    const hover = {
        mouseEnter: (_event, node) => {
            hoveredCourseKey = node.data.courseKey;
            updateHighlight();
        },
        mouseLeave: () => {
            hoveredCourseKey = null;
            updateHighlight();
        }
    };
    const nodeText = $(go.TextBlock, {
        name: "TEXT",
        margin: legend ? 8 : 0,
        width: legend ? NaN : nodeWidth - 18,
        alignment: legend ? go.Spot.Center : go.Spot.Left,
        verticalAlignment: go.Spot.Center,
        font: legend ? "bold 9pt Noto Sans KR" : "9pt Noto Sans KR",
        spacingAbove: 1,
        spacingBelow: 1,
        stroke: colors.text
    },
    new go.Binding("text", "text"),
    new go.Binding("alignment", "alignment", go.Spot.parse));
    if (!legend) {
        nodeText.bind(new go.Binding("font", "text", createCourseFontFitter(go, nodeWidth - 18, nodeHeight - 6)));
    }
    // The Viewbox remains a safeguard for exceptionally long labels.
    const nodeContent = legend ? nodeText : $(go.Panel, "Viewbox", {
        desiredSize: new go.Size(nodeWidth - 18, nodeHeight - 6),
        margin: new go.Margin(2, 8)
    }, nodeText);
    const tooltip = $(go.Adornment, "Auto",
        $(go.Shape, "RoundedRectangle", {
            name: "TIP_BACKGROUND", parameter1: 5, fill: colors.node, stroke: colors.line
        }),
        $(go.TextBlock, {
            name: "TIP_TEXT", margin: 8, maxSize: new go.Size(320, NaN),
            font: "10pt Noto Sans KR", stroke: colors.text
        },
            new go.Binding("text", "text"))
    );

    const nodeTemplate = $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse),
        { desiredSize: new go.Size(nodeWidth, nodeHeight), toolTip: tooltip, ...hover },
        $(go.Shape, "Rectangle", { name: "SHAPE" }),
        nodeContent
    );
    if (onOpenCourse) {
        nodeTemplate.click = (_event, node) => onOpenCourse(node.data);
        nodeTemplate.cursor = "pointer";
    }
    diagram.nodeTemplate = nodeTemplate;
    diagram.nodeTemplateMap.add("node", nodeTemplate);
    const miniFont = "9pt Noto Sans KR";
    // Fit both code formats at the normal font size without scaling the text.
    const miniTextSize = measureMiniCodeSize(go, model.nodeDataArray, miniFont);
    diagram.nodeTemplateMap.add("mini", $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse),
        { desiredSize: new go.Size(miniTextSize.width + 3, miniTextSize.height + 2), ...hover },
        $(go.Shape, "Rectangle", {
            name: "SHAPE", fill: colors.background, stroke: colors.background
        }),
        $(go.TextBlock, {
            name: "TEXT", alignment: go.Spot.Center, font: miniFont,
            minSize: miniTextSize, wrap: go.Wrap.None, textAlign: "center",
            verticalAlignment: go.Spot.Center, stroke: colors.text
        }, new go.Binding("text", "text"))
    ));

    const linkTemplate = $(go.Link, {
        corner: 20,
        curve: go.Link.JumpGap,
        routing: go.Link.AvoidsNodes,
        fromSpot: legend ? go.Spot.Right : go.Spot.None,
        toSpot: legend ? go.Spot.Left : go.Spot.None
    },
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
    new go.Binding("toSpot", "toSpot", go.Spot.parse),
    $(go.Shape, { name: "LINE", isPanelMain: true, strokeWidth: 1.5, stroke: colors.line },
        new go.Binding("strokeDashArray", "strokeDashArray")
    ),
    $(go.Shape, { name: "ARROW", toArrow: "Standard", fill: colors.line, stroke: colors.line }));
    if (legend) {
        linkTemplate.add($(go.TextBlock, {
            name: "TEXT", margin: 8, font: "bold 9pt Noto Sans KR",
            alignment: go.Spot.Center, segmentOffset: new go.Point(0, -10), stroke: colors.text
        }, new go.Binding("text", "text")));
    }
    diagram.linkTemplate = linkTemplate;
    go.TextBlock.setBaseline((_textBlock, textHeight) => textHeight * 0.85);
    diagram.model = new go.GraphLinksModel(model.nodeDataArray, model.linkDataArray);

    function setDisplayPreferences(preferences) {
        diagram.commit(() => {
            for (const node of diagram.model.nodeDataArray) {
                diagram.model.setDataProperty(node, "text", formatNodeText(node, preferences));
            }
        }, null);
    }
    function setTheme(theme) {
        colors = theme === "dark" ? THEMES.dark : THEMES.light;
        diagram.div.style.backgroundColor = colors.background;
        diagram.commit(() => {
            diagram.nodes.each(paintNode);
            diagram.links.each(paintLink);
        }, null);
    }
    setDisplayPreferences(displayPreferences);
    setTheme(theme);

    return {
        diagram,
        setDisplayPreferences,
        setTheme,
        fit: () => diagram.zoomToFit()
    };
}
