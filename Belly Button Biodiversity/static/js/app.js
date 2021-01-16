
// Fetch json data and console log
function buildPlot() {}
  d3.json("samples.json").then(function(importedData) {
      console.log(importedData);
      var samples = importedData.samples;
      console.log(samples);
    });