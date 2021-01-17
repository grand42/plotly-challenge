# plotly-challenge

## Belly Button Biodiversity

### Summary

The goal of this project was to create an interactive dashboard to explore a Belly Button Biodiversity data set, which catalogs the microbial colonies in human navels.

### Step 1: Plotly

###### Read Data

The D3 library was used to read in the biodiversity dataset for each individual according to the drop down menu.

###### Filter Data

The data was filtered to capture the only top 10 OTUs found in the individual.

###### Create horizontal bar chart

Using plotly, a horizontal bar chart was created comparing the 'sample values' and 'otu ids' for the top 10 OTUs found in the individual.

##### Create bubble chart

Using the sample values for the marker size and otu IDs for the x values and colors, a bubble chart was created using Plotly.

### Step 2: MetaData

###### Read Data

The demographic data was loaded using the D3 library and was filtered for each individual id.

##### Append to table

Using D3, each item in the demographic data was appended to the html sample-metadata box.