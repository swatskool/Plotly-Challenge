console.log('here')
d3.json('samples.json').then(function(data){
         var dd_list = data.names
         var dropdown = d3.select('selDataset')

         dd_list.forEach(element => {
            dropdown.append('option').text(element).property('value',element)
          });

      console.log(data);
 
   })

console.log('there')
