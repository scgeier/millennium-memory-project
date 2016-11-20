$(document).ready(function(){
    console.log("DOM loaded!");


var educationData = [['None','Significant other',1]
,['HighSchool','Acquaintance',4]
,['HighSchool','Child',6]
,['HighSchool','Classmate',2]
,['HighSchool','Friend',10]
,['HighSchool','Cousin',1]
,['HighSchool','Co-worker',3]
,['HighSchool','Niece/nephew',1]
,['HighSchool','Parent',2]
,['HighSchool','Sibling',1]
,['HighSchool','Significant Other',5]
,['HighSchool','Spouse',9]
,['HighSchool','Stranger',6]
,['Associates','Acquaintance',2]
,['Associates','Child',7]
,['Associates','Friend',4]
,['Associates','Co-worker',3]
,['Associates','Sibling',1]
,['Associates','Significant Other',3]
,['Associates','Spouse',8]
,['Associates','Stranger',2]
,['Bachelors','Acquaintance',6]
,['Bachelors','Aunt or Uncle',2]
,['Bachelors','Child',1]
,['Bachelors','Classmate',2]
,['Bachelors','Friend',9]
,['Bachelors','Co-worker',2]
,['Bachelors','Cousin',2]
,['Bachelors','Grandparent',1]
,['Bachelors','Niece/nephew',2]
,['Bachelors','Other',2]
,['Bachelors','Parent',9]
,['Bachelors','Relative-in-law',1]
,['Bachelors','Sibling',9]
,['Bachelors','Significant Other',2]
,['Bachelors','Spouse',4]
,['Bachelors','Stranger',2]
,['Graduate','Acquaintance',3]
,['Graduate','Child',4]
,['Graduate','Friend',4]
,['Graduate','Co-worker',1]
,['Graduate','Parent',2]
,['Graduate','Sibling',2]
,['Graduate','Significant Other',3]
,['Graduate','Spouse',6]
,['Graduate','Stranger',1]
];


var eduColor ={None:"#3366CC", HighSchool:"#DC3912", SomeCollege:"#FF9900", Associates:"#109618", Bachelors:"#990099", Graduate:"#e6e600"};

var svg = d3.select("#eduChart").append("svg").attr("width", 645).attr("height", 480);
            
var g = svg.append("g").attr("transform","translate(200,50)");

var bp2=viz.bP()
		.data(educationData)
		.min(12)
		.pad(1)
		.height(360)
		.width(300)
		.barSize(25)
		.fill(d=>eduColor[d.primary]);
        
        
			
g.call(bp2);

g.selectAll(".mainBars")
	.on("mouseover",eduMouseover)
	.on("mouseout",eduMouseout)

g.selectAll(".mainBars").append("text").attr("class","label")
	.attr("x",d=>(d.part=="primary"? -25: 30))
	.attr("y",d=>+6)
	.text(d=>d.key)
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
g.selectAll(".mainBars").append("text").attr("class","perc")
	.attr("x",d=>(d.part=="primary"? -100: 130))
	.attr("y",d=>+6)
	.text(function(d){ return d3.format("0.0%")(d.percent)})
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

function eduMouseover(d){
	bp2.mouseover(d);
	g.selectAll(".mainBars")
	.select(".perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}
function eduMouseout(d){
	bp2.mouseout(d);
	g.selectAll(".mainBars")
		.select(".perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}

//Show the chosen chart and hide the others//
$("#education-button").click(function() {
         $("#religionChart").slideUp(300);
         $("#politicsChart").slideUp(300);
         $("#eduChart").slideDown(400);
 });
$("#religion-button").click(function() {
         $("#religionChart").slideDown(400);
         $("#eduChart").slideUp(300);
         $("#politicsChart").slideUp(300);
 });
$("#politics-button").click(function() {
         $("#politicsChart").slideDown(400);
         $("#religionChart").slideUp(300);
         $("#eduChart").slideUp(300);
 });

      
d3.select(self.frameElement).style("height", "800px");

});//close document ready function