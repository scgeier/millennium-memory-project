$(document).ready(function(){
    console.log("DOM loaded!");
    
var politicsData = [['Democrat','Acquaintance',7]
,['Democrat','Child',4]
,['Democrat','Friend',10]
,['Democrat','Cousin',1]
,['Democrat','Co-worker',1]
,['Democrat','Other',1]
,['Democrat','Niece/Nephew',1]
,['Democrat','Parent',5]
,['Democrat','Sibling',3]
,['Democrat','Significant Other',6]
,['Democrat','Spouse',5]
,['Democrat','Stranger',3]
,['Republican','Acquaintance',1]
,['Republican','Aunt/Uncle',1]
,['Republican','Child',8]
,['Republican','Classmate',1]
,['Republican','Friend',4]
,['Republican','Co-worker',1]
,['Republican','Cousin',1]
,['Republican','Niece/nephew',1]
,['Republican','Other',1]
,['Republican','Parent',2]
,['Republican','Relative-in-law',1]
,['Republican','Sibling',2]
,['Republican','Significant Other',1]
,['Republican','Spouse',11]
,['Republican','Stranger',1]
,['Independent','Acquaintance',5]
,['Independent','Aunt/uncle',1]
,['Independent','Child',6]
,['Independent','Classmate',2]
,['Independent','Friend',9]
,['Independent','Cousin',1]
,['Independent','Co-worker',5]
,['Independent','Grandparent',1]
,['Independent','Niece/Nephew',1]
,['Independent','Other',2]
,['Independent','Parent',6]
,['Independent','Significant other',4]
,['Independent','Sibling',7]
,['Independent','Spouse',8]
,['Independent','Stranger',5]
,['Other','Acquaintance',2]
,['Other','Classmate',1]
,['Other','Friend',3]
,['Other','Co-worker',2]
,['Other','Other',2]
,['Other','Sibling',1]
,['Other','Significant Other',2]
,['Other','Spouse',3]
,['Other','Stranger',2]
];


var color ={Democrat:"#3366CC", Republican:"#DC3912",  Independent:"#FF9900", Other:"#109618"};
//var eduColor ={None:"#3366CC", HighSchool:"#DC3912", SomeCollege:"#FF9900", Associates:"#109618", Bachelors:"#990099", Graduate:"#e6e600"};

//Religion chart//
var svg = d3.select("#politicsChart").append("svg").attr("width", 645).attr("height", 480);
var g = svg.append("g").attr("transform","translate(200,50)");

var bp=viz.bP()
		.data(politicsData)
		.min(12)
		.pad(1)
		.height(360)
		.width(300)
		.barSize(25)
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
	
g.selectAll(".mainBars").append("text").attr("class","perc")
	.attr("x",d=>(d.part=="primary"? -100: 130))
	.attr("y",d=>+6)
	.text(function(d){ return d3.format("0.0%")(d.percent)})
	.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

function mouseover(d){
    console.log("test");
   
	bp.mouseover(d);
	g.selectAll(".mainBars")
	.select(".perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}
function mouseout(d){
	bp.mouseout(d);
	g.selectAll(".mainBars")
		.select(".religion-perc")
	.text(function(d){ return d3.format("0.0%")(d.percent)})
}




 
         
d3.select(self.frameElement).style("height", "500px");

});//close document ready function