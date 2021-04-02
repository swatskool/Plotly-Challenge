function grabData(sample){
   //connect to collect data from json
   d3.json('../../samples.json').then(function(data){
      //meta data for each sampleID
      var demo_data = data.metadata;
      var resultArr = demo_data.filter(sampleObject=> sampleObject.id == sample)
      var result = resultArr[0]
      console.log(resultArr)
      var panel = d3.select('#sample-metadata')
      panel.html('')
      Object.entries(result).forEach(([k,v])=>{
         panel.append('h6').text(`${k.toUpperCase()}: ${v}`);

      })
   })


};

function buildCharts(sample,n){
   //connect to collect data from json
   d3.json('../../samples.json').then(function(data){
      var samples = data.samples 
      var resultArr = samples.filter(sampleObject=> sampleObject.id == sample)
      var result = resultArr[0]
      var ids = result.otu_ids
      var labels = result.otu_labels
      var sampleValues = result.sample_values

      // Bubble Chart
      var bubblesLayout = {
         'title': ' Bubble chart',
         'margin': {
            t: 0
         },
         'hovermode' : 'closest',
         'x-axis': {
            'title': 'x title'          
         },
         'margin' : {t:30}
      };
      var bubblesTrace = {
         'x': ids,
         'y': sampleValues,
         'text':labels,
         'sizemode': 'area',
         'mode': 'markers',
         'marker':{
            'size' : sampleValues,
            'color': ids,
            'colorscale': 'Earth'
           }
         }
      //Horizontal Bar
      var barhLayout ={
         'title' : 'bar graph',
         'x-axis':{
            'title': 'xtitle'
         },
         'y-axis': {
            'title':'ytitle'
         }
      };

      new_ID=[]
      Object.entries(ids).forEach(([k,v])=>{
    
         new_ID.push(('otu-'+ v))
      

      })



      var barhTrace = {
         'x': new_ID.slice(0,11), 
         'y': sampleValues.slice(0,11),
         'width': 15,
         'bargap':2,
         'type': 'bar',
         'orientation': 'h'
      }
    


      //Gauge Chart
      wash = data['metadata'][n]['wfreq'];

         console.log(wash)
      var gaugeTrace = {
         type: "indicator",
         mode: "gauge+number",
         // delta: { reference: 20, increasing: { color: "RebeccaPurple" } },
         domain: { x: [0, 1], y: [0, 1] },
         gauge: {
            axis: { range: [null, 10] },
            // colorscale: 'Earth',
            // steps: [
            //    { range: [0, 1]},
            //    { range: [1,2] },
            //    { range: [2,3] },
            //    { range: [3,4] },              
            //    { range: [4,5] },
            //    { range: [5,6] },              
            //    { range: [6,7] },
            //    { range: [7,8] },              
            //    { range: [8,9] },
              
            // ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: wash
            },
         },
		   value: wash,
		   title: { text: "Scrubs per week" }

      }
      var degrees = 115, radius = 10;
      var radians = degrees * Math.PI / 180;
      var x = -1 * radius * Math.cos(radians);
      var y = radius * Math.sin(radians);
      var gaugelayout = { 

         shapes:[{
            type: 'line',
            x0: 0.5,
            y0: 0.2,
            x1: x,
            y1: 1,
            line: {
              color: 'black',
              width: 3
            }
          }],
         width: 600, 
         height: 500, 
         margin: { t: 0, b: 0 } ,
         xaxis: {visible: false, range: [-1, 1]},
         yaxis: {visible: false, range: [-1, 1]}
      };



      // Creating the plots
      Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      Plotly.newPlot('bar', [barhTrace], barhLayout);
      Plotly.newPlot('gauge',[gaugeTrace],gaugelayout);
      })
   
   }

   d3.selectAll("#selDataset").on("change", updatePlotly);

   function updatePlotly() {
      
      var dropdownMenu = d3.select("#selDataset");
      var new_sample = dropdownMenu.property("value");
      d3.json('../../samples.json').then(function(data){
         var samples = data.samples 
         var resultArr = samples.filter(sampleObject=> sampleObject.id == new_sample)

         for (var i =0;i <153;i++){
            if (samples[i].id==new_sample){
               idx = i
           }
         }
         grabData(new_sample)
         buildCharts(new_sample,idx)
     });

      
    
   }

function init(){

      var dropdown = d3.select('#selDataset');
      d3.json('../../samples.json').then((data)=>{
         var dd_list = data.names;
         dd_list.forEach((sample)=>{
            dropdown
               .append('option')
               .text(sample)
               .property('value',sample)

         });

         
         var firstSample = dd_list[0]
         grabData(firstSample)
         buildCharts(firstSample,0)
      })




}





init()
