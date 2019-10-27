import React from 'react';
import { Graph } from "react-d3-graph";

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: "PCP" }, { id: "UCSF Medical" }, { id: "Tunnell Skilled Nursing"}, { id: "SF Nursing Center" }, { id: "Lawton Healthcare" },
            { id: "Alegre Home Care", name: "Alegre Home Care (75%)" }],
    links: [{ source: "PCP", target: "PCP" }, { source: "PCP", target: "UCSF Medical" }, { source: "UCSF Medical", target: "Tunnell Skilled Nursing" }
            , { source: "UCSF Medical", target: "SF Nursing Center" }, { source: "UCSF Medical", target: "Lawton Healthcare" }, { source: "Tunnell Skilled Nursing", target: "Alegre Home Care" }],
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  "automaticRearrangeAfterDropNode": true,
  "collapsible": false,
  "directed": true,
  "focusAnimationDuration": 0.75,
  "focusZoom": 1,
  "height": 250,
  "highlightDegree": 1,
  "highlightOpacity": 0.2,
  "linkHighlightBehavior": true,
  "maxZoom": 8,
  "minZoom": 0.1,
  "nodeHighlightBehavior": true,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 800,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -400,
    "linkLength": 300,
    "linkStrength": 1
  },
  "node": {
    "color": "lightgreen",
    "fontColor": "black",
    "fontSize": 12,
    "fontWeight": "normal",
    "highlightColor": "red",
    "highlightFontSize": 12,
    "highlightFontWeight": "bold",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": 1.5,
    "labelProperty": "name",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 450,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "red",
    "fontSize": 10,
    "fontWeight": "normal",
    "highlightColor": "blue",
    "highlightFontSize": 8,
    "highlightFontWeight": "bold",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": false,
    "strokeWidth": 4
  }
};

const NextEncounterPrediction = React.createClass({
  getInitialState: function () {
    return {
    };
  },
  render: function () {

    return (
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
      />
      )
  }
})


export default NextEncounterPrediction;