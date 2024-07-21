// import initCH   from "./init/initCH.js";
// import initCS   from "./init/initCS.js";
// import initEE   from "./init/initEE.js";
// import initMAS  from "./init/initMAS.js";
// import initPH   from "./init/initPH.js";

import CH from "./dept/CH.js";
import CS from "./dept/CS.js";
import EE from "./dept/EE.js";
import MAS from "./dept/MAS.js";
import PH from "./dept/PH.js";

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const dept = urlParams.get("dept");
    
    const { 
        nodeWidth,
        nodeHeight,
        posX,
        posY,
        courses,
        miniNodes,
        requiredCourses,
        irregularCourses
    } = {
        "CH": CH,
        "CS": CS,
        "EE": EE,
        "MAS": MAS,
        "PH": PH
    }[dept];
    
    var $ = go.GraphObject.make;

    var myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                allowClipboard: false,
                allowHorizontalScroll: false,
                allowSelect: false,
                allowVerticalScroll: false,
                allowZoom: false,
                initialAutoScale: go.Diagram.Uniform,
                initialContentAlignment: go.Spot.Center,
                isReadOnly: true
            }
        );

    var nodeTemplate =
        $(go.Node, "Auto", new go.Binding("location", "loc", go.Point.parse),
            {
                desiredSize: new go.Size(nodeWidth, nodeHeight),  // on Panel
                mouseEnter: highlightNodes,
                mouseLeave: unhighlightNodes,
                click: link,
                cursor: "pointer"
            },
            $(go.Shape, "Rectangle",
                { name: "SHAPE" },
                new go.Binding(
                    "fill",
                    "",
                    obj => obj.isHighlighted ? "#6dab80" : obj.data.fillColor
                ).ofObject(),
                new go.Binding(
                    "stroke",
                    "isHighlighted",
                    h => h ? "#a6e6a1" : "black"
                ).ofObject(),
                new go.Binding(
                    "strokeDashArray",
                    "",
                    obj => obj.isHighlighted ? null : obj.data.strokeDashArray
                ).ofObject()
            ),
            $(go.TextBlock, "Default Text",
                {
                    name: "TEXT",
                    margin: new go.Margin(2, 8),
                    alignment: go.Spot.Left,
                    font: "bold 9pt Noto Sans KR",
                    spacingAbove: 1,
                    spacingBelow: 1
                },
                new go.Binding("text", "text"),
                new go.Binding(
                    "stroke",
                    "isHighlighted",
                    h => h ? "white" : "black"
                ).ofObject()
            )
        );

    var miniTemplate =
        $(go.Node, "Auto", new go.Binding("location", "loc", go.Point.parse),
            {
                desiredSize: new go.Size(50, 19),  // on Panel
                mouseEnter: highlightNodes,
                mouseLeave: unhighlightNodes
            },
            $(go.Shape, "Rectangle",
                {
                    name: "SHAPE",
                    fill: "white",
                    stroke: "white"
                }
            ),
            $(go.TextBlock, "Default Text",
                {
                    name: "TEXT",
                    alignment: go.Spot.Center,
                    font: "bold 9pt Noto Sans KR"
                },
                new go.Binding("text", "text"),
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "#6dab80" : "black"; }).ofObject()
            )
        );
    
    var nodeTemplateMap = new go.Map();
    nodeTemplateMap.add("node", nodeTemplate);
    nodeTemplateMap.add("mini", miniTemplate);
    myDiagram.nodeTemplateMap = nodeTemplateMap;

    myDiagram.linkTemplate =
        $(go.Link,          // the whole link panel
            {
                corner: 20,
                curve: go.Link.JumpGap,
                routing: go.Link.AvoidsNodes
            },
            new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
            new go.Binding("toSpot", "toSpot", go.Spot.parse),
            $(go.Shape,     // the link shape
                {
                    isPanelMain: true,
                    strokeWidth: 1.5
                },
                new go.Binding(
                    "stroke",
                    "isHighlighted",
                    h => h ? "#6dab80" : "black"
                ).ofObject(),
                new go.Binding("strokeDashArray", "strokeDashArray")
            ),
            $(go.Shape,     // the arrowhead
                { toArrow: "Standard" },
                new go.Binding(
                    "fill",
                    "isHighlighted",
                    h => h ? "#6dab80" : "black"
                ).ofObject(),
                new go.Binding(
                    "stroke",
                    "isHighlighted",
                    h => h ? "#6dab80" : "black"
                ).ofObject()
            )
        );
    
    go.TextBlock.setBaseline(function(textBlock, textHeight) {
        return textHeight * 0.85;
    });

    var nodeDataArray = new Array();
    var linkDataArray = new Array();

    for (const course of courses) {
        nodeDataArray.push({
            category: "node",
            key: course.code,
            loc: (course.column * posX) + " " + (course.row * posY),
            text: dept + course.code + "\n" + course.name,
            fillColor: requiredCourses.includes(course.code) ? "#e6e6e6" : "white",
            startCourseId: course.startCourseId,
            strokeDashArray: irregularCourses.includes(course.code) ? [8, 8] : null
        });

        if (course.prereqs) {
            for (const prerequisite of course.prereqs) {
                var prereq = prerequisite.split(' ');
                if (prereq.length == 1) {
                    linkDataArray.push({
                        from: prereq[0],
                        to: course.code,
                        fromSpot: course.row == courses.find(element => element.code == prereq[0]).row ? "Right" : "Bottom",
                        toSpot: course.row == courses.find(element => element.code == prereq[0]).row ? "Left" : "Top"
                    });
                } else {
                    linkDataArray.push({
                        from: prereq[0],
                        to: course.code,
                        fromSpot: prereq[1],
                        toSpot: prereq[2]
                    });
                }
            }
        }
        
        if (course.refs) {
            for (const reference of course.refs) {
                var ref = reference.split(' ');
                if (ref.length == 1) {
                    linkDataArray.push({
                        from: ref[0],
                        to: course.code,
                        fromSpot: course.row == courses.find(element => element.code == ref[0]).row ? "Right" : "Bottom",
                        toSpot: course.row == courses.find(element => element.code == ref[0]).row ? "Left" : "Top",
                        strokeDashArray: [10, 10]
                    });
                } else {
                    linkDataArray.push({
                        from: ref[0],
                        to: course.code,
                        fromSpot: ref[1],
                        toSpot: ref[2],
                        strokeDashArray: [10, 10]
                    });
                }
            }
        }
    }

    for (const mini of miniNodes) {
        nodeDataArray.push({
            category: "mini",
            key: mini.code + "m",
            loc: mini.loc,
            text: "MAS" + mini.code
        });

        for (const course of mini.prereqOf) {
            var linkInfo = course.split(' ');
            linkDataArray.push({
                from: mini.code + "m",
                to: linkInfo[0],
                fromSpot: linkInfo[1],
                toSpot: linkInfo[2]
            });
        }

        if (mini.refOf) {
            for (const course of mini.refOf) {
                var linkInfo = course.split(' ');
                linkDataArray.push({
                    from: mini.code + "m",
                    to: linkInfo[0],
                    fromSpot: linkInfo[1],
                    toSpot: linkInfo[2],
                    strokeDashArray: [10, 10]
                });
            }
        }
    }

    // Create the model data that will be represented by Nodes and Links
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

function highlightNodes(e, obj) {
    var diagram = obj.diagram;
    diagram.startTransaction("highlight");
    diagram.clearHighlighteds();
    obj.isHighlighted = true;
    highlightParents(obj);
    highlightChilderen(obj);
    diagram.commitTransaction("highlight");
}

function highlightParents(obj) {
    obj.findNodesInto().each(function(n) {
        n.isHighlighted = true;
        highlightParents(n);
    });

    obj.findLinksInto().each(function(l) {
        l.isHighlighted = true;
    });
}

function highlightChilderen(obj) {
    obj.findNodesOutOf().each(function(n) {
        n.isHighlighted = true;
        highlightChilderen(n);
    });

    obj.findLinksOutOf().each(function(l) {
        l.isHighlighted = true;
    });
}

function unhighlightNodes(e, obj) {
    var diagram = obj.diagram;
    diagram.startTransaction("no highlighteds");
    diagram.clearHighlighteds();
    obj.isHighlighted = false;
    unhighlightParents(obj);
    unhighlightChildren(obj);
    diagram.commitTransaction("no highlighteds");
}

function unhighlightParents(obj) {
    obj.findNodesInto().each(function(n) {
        n.isHighlighted = false;
        unhighlightParents(n);
    });

    obj.findLinksInto().each(function(l) {
        l.isHighlighted = false;
    });
}

function unhighlightChildren(obj) {
    obj.findNodesOutOf().each(function(n) {
        n.isHighlighted = false;
        unhighlightChildren(n);
    });

    obj.findLinksOutOf().each(function(l) {
        l.isHighlighted = false;
    });
}

function link(e, obj) {
    window.open("about:blank").location.href = "https://otl.kaist.ac.kr/dictionary?startCourseId=" + obj.data.startCourseId;
}

// Call init on page load
window.addEventListener('DOMContentLoaded', init);