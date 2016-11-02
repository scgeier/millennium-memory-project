$(document).ready(function(){
    console.log("DOM loaded!");

//Originally, the three data sets and charts (religion, education and politics) were included in a single JS file//
//On click of the radio button, the new chart loaded with chosen data set, but it was buggy;//
//the new set of percentages wouldn't display correctly on mouseover//
//I had to separate the charts into three HTML pages and JS files, and use iFrames//

/*var religionData = [['Agnostic','Acquaintance',4]
,['Agnostic','Auntie',1]
,['Agnostic','Child',1]
,['Agnostic','Classmate',1]
,['Agnostic','Friend',6]
,['Agnostic','Cousin',2]
,['Agnostic','Co-worker',1]
,['Agnostic','Grandparent',1]
,['Agnostic','Other',5]
,['Agnostic','Niece/Nephew',1]
,['Agnostic','Parent',1]
,['Agnostic','Sibling',2]
,['Agnostic','Significant Other',5]
,['Agnostic','Spouse',4]
,['Agnostic','Stranger',2]
,['Atheist','Acquaintance',1]
,['Atheist','Child',4]
,['Atheist','Friend',4]
,['Atheist','Co-worker',1]
,['Atheist','Other',1]
,['Atheist','Parent',6]
,['Atheist','Sibling',2]
,['Atheist','Significant Other',1]
,['Atheist','Spouse',4]
,['Atheist','Stranger',1]
,['Buddhist','Acquaintance',1]
,['Buddhist','Co-worker',1]
,['Buddhist','Sibling',1]
,['Buddhist','Spouse',1]
,['Catholic','Auntie',1]
,['Catholic','Child',3]
,['Catholic','Friend',1]
,['Catholic','Cousin',1]
,['Catholic','Co-worker',1]
,['Catholic','Niece/Nephew',1]
,['Catholic','Parent',2]
,['Catholic','Relative-in-law',1]
,['Catholic','Sibling',2]
,['Catholic','Spouse',3]
,['Catholic','Stranger',1]
,['Protestant','Acquaintance',5]
,['Protestant','Child',9]
,['Protestant','Classmate',3]
,['Protestant','Friend',10]
,['Protestant','Co-worker',5]
,['Protestant','Niece/Nephew',1]
,['Protestant','Other',3]
,['Protestant','Parent',4]
,['Protestant','Sibling',4]
,['Protestant','Significant Other',5]
,['Protestant','Spouse',12]
,['Protestant','Stranger',6]
];*/

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
]
;

//var color ={Agnostic:"#3366CC", Atheist:"#DC3912",  Buddhist:"#FF9900", Catholic:"#109618", Protestant:"#990099"};
var eduColor ={None:"#3366CC", HighSchool:"#DC3912", SomeCollege:"#FF9900", Associates:"#109618", Bachelors:"#990099", Graduate:"#e6e600"};

//Religion chart//
/*var svg = d3.select("#religionChart").append("svg").attr("width", 960).attr("height", 800);
var g = svg.append("g").attr("transform","translate(200,50)");

var bp=viz.bP()
		.data(religionData)
		.min(12)
		.pad(1)
		.height(600)
		.width(500)
		.barSize(35)
		.fill(d=>color[d.primary]);
        
        
			
g.call(bp);

g.selectAll(".mainBars")
	.on("mouseover",mouseover)
	.on("mouseout",mouseout)

g.selectAll(".mainBars").append("text").attr("class","label")
	.attr("x",d=>(d.part=="primary"? -25: 30))
	.attr("y",d=>+6)
	.text(d=>d.key)
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
	
g.selectAll(".mainBars").append("text").attr("class","religion-perc")
	.attr("x",d=>(d.part=="primary"? -100: 130))
	.attr("y",d=>+6)
	.text(function(d){ return d3.format("0.0%")(d.percent)})
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

function mouseover(d){
    console.log("test");
   
	bp.mouseover(d);
	g.selectAll(".mainBars")
	.select(".religion-perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}
function mouseout(d){
	bp.mouseout(d);
	g.selectAll(".mainBars")
		.select(".religion-perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}*/

//Education chart
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