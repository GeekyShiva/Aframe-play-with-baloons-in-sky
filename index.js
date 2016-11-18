
/* Based on an example from Scott Murray's "Interactive Data Visualization for the Web"
forked and developed from codepen Bryik's A-Frame CodePens*/

var dataset = []
var numDataPoints = 50;
var maxRange = Math.random() * 100;						//Max range of new values
for (var i = 0; i < numDataPoints; i++) {
  var x = Math.floor(Math.random() * maxRange);
  var y = Math.floor(Math.random() * maxRange);
  var z = Math.floor(Math.random() * maxRange);
  dataset.push([x, y, z]);
}

var scene = d3.select("a-scene")

//Create spheres
scene.selectAll("a-sphere")
   .data(dataset)
   .enter()
   .append("a-sphere")
   .attr("position", function(d) {
      return d[0] + ' ' + d[1] + ' ' + d[2]
   })
   .attr("color", "orange")
   .attr("radius", 0.45);


//On click, update with new data			
scene.on("click", function() {

    //New values for dataset
    var numValues = dataset.length;
    var maxRange = Math.random() * 100;						//Max range of new values
    dataset = [];
    for (var i = 0; i < numValues; i++) {
      var x = Math.floor(Math.random() * maxRange);
      var y = Math.floor(Math.random() * maxRange);
      var z = Math.floor(Math.random() * maxRange);
      dataset.push([x, y, z]);
    }

    //Update all spheres
    scene.selectAll("a-sphere")
       .data(dataset)
       .transition()
       .duration(1000)		
       .attrTween("position", function(d) {
          //console.log(this.components.position.data)
          var old_data = this.components.position.data
          var old_position_string = old_data.x + ' ' + old_data.y + ' ' + old_data.z
          var new_position = d[0] + ' ' + d[1] + ' ' + d[2]
          return d3.interpolate(old_position_string, new_position)
       });
  });