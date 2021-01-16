// Create a plot for each Individual
function buildPlot() {}
// Fetch json data and console log

  d3.json("samples.json").then(function(importedData) {
      console.log(importedData);
      var samples = importedData.samples;
      console.log(samples);
      // filter by id
      var filtered_samples = importedData.samples.filter(sample => sample.id === "946")[0];
      console.log(filtered_samples);
      sample_id = filtered_samples.otu_ids;
      console.log(sample_id);
    });