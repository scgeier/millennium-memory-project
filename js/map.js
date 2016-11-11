
var width = 768,
    height = 400;
    //centered;

//Make the color of the cities a function of the memory score//
var color = d3.scale.linear().domain([0, 17]).range(['blue', 'yellow']);

//Make the legend canvas
var legend = d3.select("#legend")
    .append("svg")
//responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 710 100")
   //class to make it responsive
    .classed("svg-content-responsive", true)
    .attr("class", "legend-box");

//Data for the legend//
var legendData = [
      {
        cx: 50,
        fill:0,
        title:"0"
      },
      {
        cx: 75,
        fill:1,
        title:""
      },
       {
        cx: 100,
        fill:2,
        title:""
      },
        {
        cx: 125,
        fill:3,
        title:""
      },
      {
        cx: 150,
        fill:4,
        title:""
      },
      {
        cx: 175,
        fill:5,
        title:""
      },
       {
        cx: 200,
        fill:6,
        title:""
      },
      {
        cx: 225,
        fill:7,
        title:""
      },
      {
        cx: 250,
        fill:8,
        title:""
      },
      {
        cx: 300,
        fill:9,
        title:""
      },
      {
        cx: 325,
        fill:10,
        title:""
      },
      {
        cx: 350,
        fill:11,
        title:""
      },
      {
        cx: 375,
        fill:12,
        title:""
      },
      {
        cx: 400,
        fill:13,
        title:""
      },
      {
        cx: 425,
        fill:14,
        title:""
      },
      {
        cx: 450,
        fill:15,
        title:""
      },
      {
        cx: 475,
        fill:16,
        title:""
      },
      {
        cx: 500,
        fill:17,
        title:"17"
      }
      ];


//Make a tooltip//
var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "white")
                .style("opacity", 0);

//Use the albersUsa projection of the USA to draw the map               
var projection = d3.geo.albersUsa()
    .scale(900)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

//make the SVG canvas
var svg = d3.select("#map")
    .append("svg")
 //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 710 400")
   //class to make it responsive
    .attr("class","map-content")
    .classed("svg-content-responsive", true);
    
//call the JSON data for the US map and draw the blank map, without dots, first//
 d3.json("/js/us.json", function(error, us) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);


  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
      .attr("class", "county-boundary")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "state-boundary")
      .attr("d", path);
      
//Call the csv data for the dot coordinates and add the dots to the map//
     d3.csv("/js/cities.csv", function(error, data) {
        svg.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("class", "dots")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", 3.8)
           .style("fill", function(d) { return color(d.score); })
          //.on("click", clicked)
           

       });//close csv call
});//close the JSON call
 
 //Build the legend below the chart
legend.selectAll("circle")
      .data(legendData)
      .enter()
      .append("circle")
      .transition()
      .delay(1000)
      .ease("quad-in")
      .attr("cx", function(d){return d.cx;})
      .attr("cy", 10)
      .attr("r", 5)
      .style("fill", function(d) { return color(d.fill);});
      
legend.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .transition()
      .delay(1000)
      .ease("quad-in")
      .attr("x", function(d) { return (d.cx - 5); })
      .attr("y", 30)
      .attr("font-family", "sans-serif")
      .attr("font-size", "1.2em")
      .attr("fill", "black")
      .text( function (d) {return d.title;});
   

d3.select(self.frameElement).style("height", height + "px");


//Move the dots to the new location when user clicks the radio button//
function updateData() {

//VANILLA JS CODE FOR FADE-IN ON PULL QUOTE//
//document.getElementById("msg").className = "fade-in";
     
  console.log("testing");
  
  svg.selectAll("circle")
      .transition()  // Transition from 1999 location to current 
      .duration(2000)  // Length of animation
      .ease("quad-in")
      .attr("cx", function(d) {
                   return projection([d.currLon, d.currLat])[0];
           })
      .attr("cy", function(d) {
                   return projection([d.currLon, d.currLat])[1];
           })
  
    
  //note to self:NEED TO UPDATE THE TOOLTIPS WITH CURRENT CITY//
  
}

//Move the dots back to their original location when user clicks the 1999 radio button//
function restoreData() {
  
  console.log("hello");
  
  svg.selectAll("circle")
      .transition()  // return dots back to their 1999 positions
      .duration(2000)  
      .ease("quad-in")
      .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
      .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
}





