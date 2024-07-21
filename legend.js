function init() {
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
                initialContentAlignment: go.Spot.Bottom,
                isReadOnly: true
            }
        );
    
    myDiagram.nodeTemplate =
        $(go.Node, "Auto", new go.Binding("location", "loc", go.Point.parse),
            {
                desiredSize: new go.Size(140, 70),  // on Panel
                mouseEnter: highlightNodes,
                mouseLeave: unhighlightNodes
            },
            $(go.Shape, "Rectangle",
                { name: "SHAPE" },
                new go.Binding("fill", "", function(obj) { return obj.isHighlighted ? "#6dab80" : obj.data.fillColor; }).ofObject(),
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "#a6e6a1" : "black"; }).ofObject(),
                new go.Binding("strokeDashArray", "", function(obj) { return obj.isHighlighted ? null : obj.data.strokeDashArray; }).ofObject()
            ),
            $(go.TextBlock, "Default Text",
                {
                    name: "TEXT",
                    margin: 8,
                    font: "bold 9pt Noto Sans KR",
                    verticalAlignment: go.Spot.Center,
                    spacingAbove: 1,
                    spacingBelow: 1
                },
                new go.Binding("text", "text"),
                new go.Binding("alignment", "alignment", go.Spot.parse),
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "white" : "black"; }).ofObject(),
            )
        );
    
    myDiagram.linkTemplate =
        $(go.Link,          // the whole link panel
            {
                corner: 20,
                curve: go.Link.JumpGap,
                routing: go.Link.AvoidsNodes,
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left
            },
            $(go.Shape,     // the link shape
                {
                    isPanelMain: true,
                    strokeWidth: 1.5
                },
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "#6dab80" : "black"; }).ofObject(),
                new go.Binding("strokeDashArray", "strokeDashArray"),
            ),
            $(go.Shape,     // the arrowhead
                { toArrow: "Standard" },
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "#6dab80" : "black"; }).ofObject(),
                new go.Binding("fill", "isHighlighted", function(h) { return h ? "#6dab80" : "black"; }).ofObject(),
            ),
            $(go.TextBlock, "Default Text",
                {
                    name: "TEXT",
                    margin: 8,
                    font: "bold 9pt Noto Sans KR",
                    alignment: go.Spot.Center,
                    segmentOffset: new go.Point(0, -10)
                },
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "#6dab80" : "black"; }).ofObject(),
                new go.Binding("text", "text")
            )
        );
    
    go.TextBlock.setBaseline(function(textBlock, textHeight) {
        return textHeight * 0.85;
    });

    var nodeDataArray = [
        { key: "1", loc: "0 0", text: "과목번호\n과목명", alignment: "Left", fillColor: "white" },
        { key: "2", loc: "210 0", text: "배경색–과목 구분\n회색: 전공 필수*\n흰색: 전공 선택", alignment: "Center", fillColor: "#e6e6e6" },
        { key: "3", loc: "420 0", text: "테두리–개설 주기\n실선: 매년/매 학기\n점선: 격년/불규칙적", alignment: "Center", fillColor: "white", strokeDashArray: [10, 10] }
    ];
    
    var linkDataArray = [
        { from: "1", to: "2", text: "선수 과목" },
        { from: "2", to: "3", strokeDashArray: [10, 10], text: "참고 과목" }
    ]

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

// Call init on page load
window.addEventListener('DOMContentLoaded', init);