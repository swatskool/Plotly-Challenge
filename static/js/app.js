function grabData(sample){
   //connect to collect data from json
   d3.json('samples.json').then(function(data){
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
   d3.json('samples.json').then(function(data){
      var samples = data.samples 
      var resultArr = samples.filter(sampleObject=> sampleObject.id == sample)
      var result = resultArr[0]
      var ids = result.otu_ids
      var labels = result.otu_labels
      var sampleValues = result.sample_values
      var otu_labels = result.otu_labels

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
         'title' : 'Top 10 Belly Button Cultures',

      };

      new_ID=[]
      Object.entries(ids).forEach(([k,v])=>{
    
         new_ID.push(('otu-'+ v))
      

      })

      var barhTrace = {
         'x': sampleValues.slice(0,10).reverse(),
         'y': new_ID.slice(0,10), 
         
        'type': 'bar',
         'orientation': 'h',
         'marker':{
            'color' : otu_labels,

           }
      }
    


      //Gauge Chart
      wash = data['metadata'][n]['wfreq'];

         console.log(wash)
      var gaugeTrace = {
         domain: { x: [0, 1], y: [0, 1] },
         type: "indicator",
         mode: "gauge+number",

         
         gauge: {
            axis: { visible:true, range:[null,9], nticks:10},
            bar: {color:'brown'},


         },
		   value: wash,
		   title: { text: "Belly Button Washing frequency \n Scrubs per week" }

      }
      var gaugelayout = { 

     
         width: 600, 
         height: 500, 
         margin: { t: 0, b: 0 } ,

      };



      // Creating the plots
      Plotly.newPlot('bubble', [bubblesTrace], bubblesLayout);
      Plotly.newPlot('bar', [barhTrace], barhLayout);
      console.log('here')
      Plotly.newPlot('gauge',[gaugeTrace],gaugelayout);
      })
   
   }

   d3.selectAll("#selDataset").on("change", updatePlotly);

   function updatePlotly() {
      
      var dropdownMenu = d3.select("#selDataset");
      var new_sample = dropdownMenu.property("value");
      d3.json('samples.json').then(function(data){
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
      d3.json('samples.json').then((data)=>{
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
