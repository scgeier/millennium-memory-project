
var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 768 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Set the X range//
var x = d3.scale.linear()
    .range([0, width]);

//Set the Y range//
var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//Make a responsive SVG canvas for the chart//
var svg = d3.select("#chart")
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 738 400")
    .attr("class", "scatterplot-diagram")
   //class to make it responsive
    .classed("svg-content-responsive", true)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Make a tooltip//
var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "white")
                .style("border", "1px solid gray")
                .style("width", "40%")
                .style("padding", "5px")
                .style("opacity", 0);
  
  
//Build the initial chart on page load and call the JSON data//
function init(){
  d3.json("js/bump.json", function(error, data) {
  if (error) throw error;
  
//Set the X and Y axes using the min amd max values from the user's chosen data set//
  x.domain(d3.extent(data, function(d) { return d.age; })).nice();
  y.domain(d3.extent(data, function(d) { return d.score; })).nice();

//Make the X axis and change the label according to the chosen category
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", 11)
      .call(xAxis)
    .append("text")
      .attr("class", "x label")
      .attr("x", width - 10)
      .attr("y", 25)
      .style("font-size", "1.5em")
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text("Age");

//Make the Y axis, with the label's content AND position a function of the data
  svg.append("g")
      .attr("class", "y axis")
      .style("font-size", 11)
      .call(yAxis)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".4em")
      .style("font-size", "1.5em")
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text("Memory Score");

//Make the dots and hide the ones that have null values//
var dots = svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4.5)
      .attr("cx", function(d) { return x(d.age);})
      .attr("cy", function(d) { return y(d.score);})
      .style("stroke", "gray")
      .style("stroke-width", "1px")
      .style("cursor", "pointer")
      .style("fill", function(d){return color(d.score);})
      
//Show the tooltip on mouseover//
      .on("click", function(d){
         //document.getElementById("article-intro").className = "fade-out";
         tooltip.transition(d)
          .delay(200)
          .ease("quad-in")
          .attr("class", "memory-text")
          .style("opacity", .95)
          .style("width", phoneWidth)
          .style("left", phoneLeftPos)
          .style("top", (d3.event.pageY) + "px")
  
        tooltip.html("'" + "<span id='close-button'>✖</span>" + "<em>" + d.memory + "</em>" + "'")
        
        console.log(d.name);
        document.getElementById("page-content").style.opacity = "0.2";
      
        var elClose = document.getElementById("close-button");
        elClose.onclick = function(){
          document.getElementsByClassName("tooltip").style.opacity = "0";
        };
      
      function phoneWidth() {
        if (window.innerWidth < 767) {
            return "90%";
        }else{
          return "40%";
        }
      }
      
      function phoneLeftPos() {
        if (window.innerWidth < 767) {
            return "5%";
        }else{
          return (d3.event.pageX) + "px";
        }
      }
        
      })
      
//Remove tooltip on mouseout//
      .on("mouseleave", function(d){
        //document.getElementById("article-intro").className = "fade-in";
         tooltip.transition().style("opacity", 0)
         console.log("mouseout");
         document.getElementById("page-content").style.opacity = "1";
      });

  });//close d3.json
};//close init();

init();

