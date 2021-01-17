// Create a plot for each Individual
function buildPlot(id) {
// Fetch json data and console log

  d3.json("samples.json").then(function(importedData) {
      //console.log(importedData);
      var samples = importedData.samples;
      // console.log(samples);
      // filter by id
      var filtered_samples = samples.filter(sample => sample.id === id)[0];
      //console.log(filtered_samples);
      var sample_id = filtered_samples.otu_ids;
      //console.log(sample_id);
      var sample_value = filtered_samples.sample_values;
      //console.log(sample_value);
      //get top t0 values
      var Values = sample_value.slice(0,10).reverse();
      var IDs = sample_id.slice(0,10).reverse().map(otu => "OTU " + otu);
      //console.log(Values);
      //console.log(IDs);
      //get labels
      var Labels = filtered_samples.otu_labels.slice(0,10).reverse();
      //console.log(Labels);
      //create trace
      var trace = {
        x:Values,
        y:IDs,
        text: Labels,
        type:"bar",
        orientation: "h",
        marker: {
          color: 'rgb(255,0,0)',
          line: {
            color: 'rgb(20,20,20)',
            width: 1.5
          }}
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
      //create bubble chart
      var trace2 = {
        x:sample_id,
        y:sample_value,
        mode:'markers',
        marker: {size:sample_value, color:sample_id},
        text:filtered_samples.otu_labels,
        continuous_colorscale:'Viridis'

      };
      data2 = [trace2];
      layout2 = {
        xaxis:{title:"OTU ID"},
        height:700,
        width:1000
      };

      Plotly.newPlot("bubble", data2, layout2);
    });
};
  // Get MetaData
function GetMeta(id) {
  d3.json("samples.json").then(function(importedData) {
        var MetaData = importedData.metadata;
        //console.log(MetaData);
        var Individual = MetaData.filter(metadata => metadata.id.toString() === id)[0];
        //console.log(Individual);
        // Select meta-data from index
        var Info = d3.select("#sample-metadata");
        //clear form
        Info.html("")
        //Create variables for demographics
        var ID = Individual.id;
        var Age = Individual.age;
        var Location = Individual.location;
        var Ethnicity = Individual.ethnicity;
        var Sex = Individual.gender;
        var BB_Type = Individual.bbtype;
        var wash = Individual.wfreq;
        Info.append("h5").text("ID: " + ID);
        Info.append("h5").text("Age: " + Age);
        Info.append("h5").text("Sex: " + Sex);
        Info.append("h5").text("Ethnicity: " + Ethnicity);
        Info.append("h5").text("Location: " + Location);
        Info.append("h5").text("Belly Button Type: " + BB_Type);
      //create trace for Gauge Plot
      var label = ["-", "0-1", '1-2', '2-3', '3-4', '4-5', '5-6','6-7','7-8','8-9', '9-10'];
        trace3 = {
          values:[50, 5, 5,5, 5,5, 5, 5, 5, 5, 5],
          labels:label,
          marker:{colors:[
            'rgb(255, 255, 255)',
            'rgb(254, 254, 204)',
            'rgb(255, 255, 163)',
            'rgb(255, 255, 0)',
            'rgb(246, 210, 0)',
            'rgb(229, 167, 0)',
            'rgb(205, 127, 0)',
            'rgb(175, 90, 13)',
            'rgb(141, 57, 17)',
            'rgb(104, 27, 15)',
            'rgb(67, 0, 0)'
          ]},
          name:"Gauge",
          domain:{x:[0,0.48]},
          type:'pie',
          hole:.3,
          direction:"clockwise",
          rotation:90,
          textposition:"inside",
          hoverinfo:"none",
          textinfo:"label"

        };
        data3 = [trace3];
        layout3 = {
         title:"Wash Frequency: Washes per Week",
          showlegend:false,
          xaxis: {
              showticklabels:false,
              showgrid:false,
              zeroline:false,
          },
          yaxis: {
              showticklabels: false,
              showgrid: false,
              zeroline: false,
          },
          shapes: [
              {
                  type: 'path',
                  path: 'M 0.235 0.5 L 0.24 0.65 L 0.245 0.5 Z',
                  fillcolor: 'rgba(255, 0, 0, 0.5)',
                  line: {
                      width: 0.5
                  },
                  xref: 'paper',
                  yref: 'paper'
              }],
          
          annotations: 
              {
                  xref: 'paper',
                  yref: 'paper',
                  x: 0.23,
                  y: 0.45,
                  text: '50',
                  showarrow: false
              }
          
      };
      Plotly.newPlot("gauge", data3, layout3);
  });
};
  // Create function for dropdown menu
function dropdown () {
  var menu=d3.select("#selDataset");
  d3.json("samples.json").then(function(importedData) {
    console.log(importedData);
    var Names = importedData.names;
    Names.forEach(function(name){
      menu.append("option").text(name);
    });
    buildPlot(Names[0]);
    GetMeta(Names[0]);
});
}
dropdown();

// Create Change event
function optionChanged(id) {
  buildPlot(id);
  GetMeta(id);
};