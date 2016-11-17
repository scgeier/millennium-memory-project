$(document).ready(function(){
    console.log("DOM loaded!");
	
//Build a data matrix for the chart; this is clearer and more intuitive than a JSON file for this type of vis//
var x=[
  ["Remember", 146, "Men", 78, "White", 53, "Single", 47],
  ["Remember", 146, "Men", 78, "White", 53, "Married", 6],
  ["Remember", 146, "Men", 78, "Black", 9, "Single", 9],
  ["Remember", 146, "Men", 78, "Hispanic", 3, "Single", 3],
  ["Remember", 146, "Men", 78, "Asian", 6, "Single", 6],
  ["Remember", 146, "Men", 78, "Native Am", 1, "Married", 1],
  ["Remember", 146, "Men", 78, "Other", 1, "Married", 1],
  ["Remember", 146, "Men", 78, "Mix", 5, "Single", 4],
  ["Remember", 146, "Men", 78, "Mix", 5, "Married", 1],
  ["Remember", 146, "Women", 67, "White", 46, "Single", 32],
  ["Remember", 146, "Women", 67, "White", 46, "Married", 13],
  ["Remember", 146, "Women", 67, "White", 46, "Divorced", 1],
  ["Remember", 146, "Women", 67, "Black", 10, "Single", 8],
  ["Remember", 146, "Women", 67, "Black", 10, "Married", 1],
  ["Remember", 146, "Women", 67, "Black", 10, "Divorced", 1],
  ["Remember", 146, "Women", 67, "Hispanic", 3, "Single", 2],
  ["Remember", 146, "Women", 67, "Hispanic", 3, "Married", 1],
  ["Remember", 146, "Women", 67, "Asian", 5, "Single", 4],
  ["Remember", 146, "Women", 67, "Asian", 5, "Divorced", 1],
  ["Remember", 146, "Women", 67, "Multiple Races", 3, "Single", 2],
  ["Remember", 146, "Women", 67, "Multiple Races", 3, "Married", 1],
  ["Remember", 146, "Other", 1, "White", 1, "Single", 1],
  ["Forgot", 68, "Men", 35, "White", 24, "Single", 20],
  ["Forgot", 68, "Men", 35, "White", 24, "Married", 4],
  ["Forgot", 68, "Men", 35, "Black", 1, "Single", 1],
  ["Forgot", 68, "Men", 35, "Hispanic", 2, "Single", 2],
  ["Forgot", 68, "Men", 35, "Asian", 8, "Single", 7],
  ["Forgot", 68, "Men", 35, "Asian", 8, "Married", 1],
  ["Forgot", 68, "Women", 30, "White", 21, "Single", 10],
  ["Forgot", 68, "Women", 30, "White", 21, "Married", 8],
  ["Forgot", 68, "Women", 30, "White", 21, "Divorced", 2],
  ["Forgot", 68, "Women", 30, "White", 21, "Widowed", 1],
  ["Forgot", 68, "Women", 30, "Hispanic", 2, "Single", 2],
  ["Forgot", 68, "Women", 30, "Asian", 7, "Single", 2],
  ["Forgot", 68, "Women", 30, "Asian", 7, "Married", 5],
  ["Forgot", 68, "Other", 1, "Asian", 1, "Married", 1],
  ["Forgot", 68, "No Answer", 2, "No Answer", 1, "No Answer", 1],
];

//Make an obj function that creates an object with various properties to build the chart//
var obj = function(name,x) {
 return {"name":name,"size":Math.abs(x),"sign":x,"children":[]};
};
var root = new obj();
root.name = 'Total';
var column = x[0].length;//set the number of columns in the matrix using the number of values in the first array in X (e.g., 8)//
var row = x.length;//set the number of rows to the number of arrays in X (e.g, 31)//
var parent = root;
var temp; var c,r,flag; var temp1,temp2;
for(c=0;c<column-1;c+=2) {
 temp = new obj();
 temp.name = x[0][c];//set the name in the first column as the names in the chart
 temp.sign = x[0][c+1];
 temp.size = Math.abs(temp.sign);
 parent.children.push(temp);
 parent = parent.children[0];
}

for(r=1;r<row;r++) {
 parent = root;
 for(c=0;c<column-1;c+=2) {
  flag=0;
  for(d=0;d<parent.children.length;d++) {
   if(parent.children[d].name == x[r][c]) {
    parent = parent.children[d];
	if(c==column-2) {parent.sign+=x[r][c+1]; parent.size += Math.abs(x[r][c+1]);} //line added 
	flag=1;
   }
  }
   if(flag==0) {
   temp = new obj();
   { temp.name = x[r][c]; temp.sign=x[r][c+1]; temp.size = Math.abs(temp.sign);}
   
   parent.children.push(temp);
   parent=parent.children[parent.children.length-1];
   }
   
  
 }
 
}
console.log(root);
root.size=0;
for(var i=0;i<root.children.length;i++) {
	root.size+=root.children[i].size;
}


var myColor = d3.scale.linear()
	.domain([0,146])
    .range(["#ffff33", "#008ae6"]);//blue and green//
	//.range(["#ffff33", "#e65c00"]);//if you want to make the top-level colors red and orange//
	//.range(["#1a1aff", "#e6e600"]);//for top-level colors yellow and grayish-blue//
    
var margin = {top: 200, right: 224, bottom: 200, left: 224},
    radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 20;
	
var svg = d3.select("#unilevel-partition")
    .append("svg")
 //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 448 400")
    .attr("class", "doughnut")
//class to make it responsive
   .classed("svg-content-responsive", true)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
var partition = d3.layout.partition()
    .sort(function(a, b) { return d3.ascending(a.name, b.name); })
    .size([2 * Math.PI, radius]);
	
var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
    .innerRadius(function(d) { return radius / 3 * d.depth; })
    .outerRadius(function(d) { return radius / 3 * (d.depth + 1) - 1; });
	
//Tooltip description
var tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("background", "white")
    .style("font-size", "1em")
    .style("opacity", 0);

//Set the percentages in the tooltip to two decimal points
function format_number(x) {
  return x.toFixed(2);
}

function format_description(d) {
  var description = d.name;
      return  d.name + '<br>' + format_number((d.size/214) * 100) + '%';
}

//Rotate the labels in the left side of the ring//
function computeTextRotation(d) {
	var angle=(d.x +d.dx/2)*180/Math.PI - 90	
	return angle;
}

//Show percentages in a tooltip on mouseover//
function mouseOverArc(d) {
		  d3.select(this).attr("stroke","#ccc").attr("stroke-width", "2px")//add a focus stroke on the chosen chart section//
			 
          tooltip.html(format_description(d));
          return tooltip.transition()
            .duration(50)
            .style("opacity", 0.9)
            .style("font-family", "Helvetica")
			.style("color", "black");
        }

function mouseOutArc(){
	d3.select(this).attr("stroke","")
	return tooltip.style("opacity", 0);
   
}

function mouseMoveArc (d) {
          return tooltip
            .style("top", (d3.event.pageY-10)+"px")
            .style("left", (d3.event.pageX+10)+"px");
}

f();
var level=0;

function f() {  	
  // Compute the initial layout on the entire tree to sum sizes.
  // Also compute the full name and fill color for each node,
  // and stash the children so they can be restored as we descend.
  partition
      .value(function(d) { return d.size; })
      .nodes(root)
      .forEach(function(d) {
        d._children = d.children;
        d.sum = d.value;
        d.key = key(d);  
      });
  // Now redefine the value function to use the previously-computed sum.
  partition
      .children(function(d, depth) { return depth < 1 ? d._children : null; })
      .value(function(d) { return d.size; });
	  
  var center = svg.append("circle")
      .attr("r", radius / 20)
       .style("fill", "#8c8c8c")
      .on("click", zoomOut);
  center.append("title")
      .text("zoom out");
	  
   var path = svg.selectAll("g")
      .data(partition.nodes(root).slice(1))
    .enter().append("path")
	   .attr("class", "ring")
      .attr("d", arc)
      .style("fill", function(d) { return myColor(d.sign); })
	  .each(function(d) { this._current = updateArc(d); })
      .on("click", zoomIn)
	  .on("mouseover", mouseOverArc)
      .on("mousemove", mouseMoveArc)
      .on("mouseout", mouseOutArc);
	var g = svg.selectAll("g")
      .data(partition.nodes(root).slice(1))
    .enter().append("g");
	  
	  
var text = g.append("text")
	.attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
	.attr("text-anchor","middle")
	.attr("x", function(d) { return (d.y); })
    .attr("dx", "2") // margin (position on x axis relative to the absolute x)
    .attr("dy", ".35em") // vertical-align (position relative to the absolute x position)
    .attr("font-family", "sans-serif")
	.attr("fill", "black")
    .attr("class", "demographic-label")
	.text(function(d) {return d.name; });
	
function computeTextRotation(d) {
 
  return ((d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;

}


function zoomIn(p) {g.attr("opacity", 0);
  	
    if (p.depth > 1) p = p.parent;
    zoom(p, p);
  }
  function zoomOut(p) {g.attr("opacity", 0); 
  	if (!p.parent) return; 
    zoom(p.parent, p);
  }
  // Zoom to the specified new root.
  function zoom(root, p) {
    if (document.documentElement.__transition__) return;
    // Rescale outside angles to match the new layout.
    var enterArc,
        exitArc,
        outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);
    function insideArc(d) {
      return p.key > d.key
          ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
          ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
          : {depth: 0, x: 0, dx: 2 * Math.PI};
    }
    function outsideArc(d) {
      return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
    }
    center.datum(root);
    // When zooming in, arcs enter from the outside and exit to the inside.
    // Entering outside arcs start from the old layout.
    if (root === p) { enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]); }
    path = path.data(partition.nodes(root).slice(1), function(d) { return d.key; });
	g = g.data(partition.nodes(root).slice(1), function(d) { return d.key; });
    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);
    d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {
      path.exit().transition()
          .style("fill-opacity", function(d) { return d.depth === 1 + (root === p) ? 1 : 0; })
          .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
          .remove();
      path.enter().append("path")
          .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
          .style("fill", function(d) { return myColor(d.sign); })
          .on("click", zoomIn)
          .on("mouseover", mouseOverArc)
          .on("mousemove", mouseMoveArc)
          .on("mouseout", mouseOutArc)
          .each(function(d) { this._current = enterArc(d); });
	
	g.enter().append("text")
		.attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
		.attr("text-anchor","middle")
        .attr("x", function(d) { return (d.y); })
		.attr("dx", "6") // margin
		.attr("dy", ".35em") // vertical-align
        .attr("fill", "dark gray")
      .attr("font-family", "sans-serif")
		.text(function(d) { return d.name; });
	
      path.transition()
          .style("fill-opacity", 1)
          .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
    });
  }
}
function key(d) {
  var k = [], p = d;
  while (p.depth) k.push(p.name), p = p.parent;
  return k.reverse().join(".");
}
function arcTween(b) {
  var i = d3.interpolate(this._current, b);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
function updateArc(d) {
   
  return {depth: d.depth, x: d.x, dx: d.dx};
}
d3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");


});//close document ready function
