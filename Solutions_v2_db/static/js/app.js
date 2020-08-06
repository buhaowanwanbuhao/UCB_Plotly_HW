    // SampleData Function use for colletino of MetaData
function SammpleData(sample) {
  d3.json(`/metadata/${sample}`).then((data) => {

    var PANEL = d3.select("#Data_Sample");

   
    PANEL.html("");

   
    Object.entries(data).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}: ${value}`);
    });

    buildGauge(data.WFREQ);
  });
}

function Craet_Charts(sample) {
  d3.json(`/samples/${sample}`).then((data) => {
    const otu_ids = data.otu_ids;
    const otu_labels = data.otu_labels;
    const sample_values = data.sample_values;

    // Build a bubble_diagram
    var Bubble_Diagram = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.plot("bubble_diagram", bubbleData, Bubble_Diagram);

    // Creating Circle_Graph 
    var Create_Circle_Graph = [
      {
        values: sample_values.slice(0, 10),
        labels: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];

    var pieLayout = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("Circle_Graph", Create_Circle_Graph, pieLayout);
  });
}

function init() {

  var selector = d3.select("#GetDataset");


  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

   
    const firstSample = sampleNames[0];
    Craet_Charts(firstSample);
    SammpleData(firstSample);
  });
}

function NewSampleData(newSample) {

  Craet_Charts(newSample);
  SammpleData(newSample);
}


init();
