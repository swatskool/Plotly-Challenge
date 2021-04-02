// d3.json('../../samples.json').then(function(data){
//       let dd_list = data.names;
//       let demo_data = data.metadata;
//       let samples = data.samples;
//       var dropdown = d3.select('#selDataset');
//       dd_list.forEach(element => {
//          dropdown.append('option').text(element).property('value',element)
         
//        });
//        sample_id = d3.select('#selDataset').property('value');
//        idx = getDemoData(sample_id, demo_data);
//        console.log(samples);
//        m_data = d3.select('.panel-body');
//        table = m_data.append('table')
//        tbody = table.append('tbody')
//        row = tbody.append('row')
//        cell = row.append('td')  // how to use foreACH HERE
//        cell.text('id : ' +sample_id)
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('Ethnicicty : ' +demo_data[idx]['ethnicity'])
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('Age : ' +demo_data[idx].age)
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('Gender : ' +demo_data[idx].gender)
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('Location : ' +demo_data[idx].location)
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('BBtype : ' +demo_data[idx].bbtype)
//        row = tbody.append('tr')
//        cell = row.append('td')
//        cell.text('Wfreq: ' +demo_data[idx].wfreq)
      
//        if (samples[idx]['id'] == sample_id){
//           x = samples[idx]['otu_ids']
//           y = samples[idx]['sample_values']
//           trace = {
//             'type':'bar' ,
//             'x': x,
//             'y': y,
//             'orientation':'h',
//             'mode':'markers',
//             'markers': {size:20},
//             'text':samples[idx]['otu_labels']
//             }
//          layout = {
//             'barmode': 'stack'
//          }
//           data = [trace]
//           Plotly.newPlot('bar',data, layout)
//        }



       

   
       
// });



// function getDemoData(sid, try_data){
//    var idx

//    for (var i = 0; i<153;i++){
//       if (try_data[i].id == sid){
//          return i
//       }

//    }

// }

function grabData(sample){
   d3.json('../../samples.json').then(function(data){
      // let dd_list = data.names;
      var demo_data = data.metadata;
      // let samples = data.samples;
      var resultArr = demo_data.filter(sampleObject=> sampleObject.id == sample)
      var result = resultArr[0]
      var panel = d3.select('#sample-metadata')
      panel.html('')
      Object.entries(result).forEach(([k,v])=>{
         panel.append('h6').text(`${k.toUpperCase()}: ${v}`);

      })
   })


};

function buildCharts(sample){
   d3.json('../../samples.json').then(function(data){
      var samples = data.samples 
      var resultArr = samples.filter(sampleObject=> sampleObject.id == sample)
      var result = resultArr[0]
      var ids = result.otu_ids
      var labels = result.otu_labels
      var sampleValues = result.sample_values
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
      var bubblesData = {
         'x': ids,
         'y': sampleValues,
         'text':labels,
         'mode': 'markers',
         'markers':{
            'size' : sampleValues,
            'color': ids,
            'colorscale': 'Earth'
           }
         }
      Plotly.newPlot('bubble', [bubblesData], bubblesLayout);
      })
   
   }


//       trace = {
//                      'type':'bar' ,
//                      'x': x,
//                      'y': y,
//                      'orientation':'h',
//                      'mode':'markers',
//                      'markers': {size:20},
//                      'text':samples[idx]['otu_labels']
//                      }
//                   layout = {
//                      'barmode': 'stack'
//                   }
//                    data = [trace]
//                    Plotly.newPlot('bar',data, layout)

// }




function init(){
      var dropdown = d3.select('#selDataset');
      d3.json('../../samples.json').then((data)=>{
         var dd_list = data.names;
         dd_list.forEach((sample)=>{
            dropdown
               .append('option')
               .text(sample)
               .property('value',sample)
         // var firstSample = dd_list[0]
         });
         var firstSample = dd_list[0]
         grabData(firstSample)
         buildCharts(firstSample)
      })




}





init()
