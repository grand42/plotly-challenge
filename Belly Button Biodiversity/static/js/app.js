// Create a plot for each Individual
function buildPlot() {}
// Fetch json data and console log

  d3.json("samples.json").then(function(importedData) {
      console.log(importedData);
      var samples = importedData.samples;
      //console.log(samples);
      // filter by id
      var filtered_samples = importedData.samples.filter(sample => sample.id === "946")[0];
      //console.log(filtered_samples);
      var sample_id = filtered_samples.otu_ids;
      //console.log(sample_id);
      var sample_value = filtered_samples.sample_values;
      //console.log(sample_value);
      //get top t0 values
      var Values = sample_value.slice(0,10);
      var IDs = sample_id.slice(0,10).map(otu => "OTU " + otu);
      console.log(Values);
      console.log(IDs);
      //get labels
      var Labels = filtered_samples.otu_labels.slice(0,10);
      console.log(Labels);
      //create trace
      var trace = {
        x:Values,
        y:IDs,
        text: Labels,
        type:"bar",
        orientation: "h"
      };
      var data = [trace];
      //create layout
      var layout = {
        title:"Top 10 OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
      //create new plot
      Plotly.newPlot("bar", data, layout);
    });