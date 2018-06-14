const athleteid = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1);
var server = window.location.origin;
var exercises = [];
var selectedExerciseId;
var selectedExercise;
var xData;
var yData;
var graphable = true;

const populateExercises = () => {
	var path = "/api/allExercises/"+athleteid;
	console.log('in populateExercises')
	console.log(path)
	console.log(server)
	$.ajax({
		type:'GET',
		contentType: 'application/json',
        url: server + path,						
        success: function(data) {
            console.log('got all exercises');
            exercises = data;
            console.log(exercises)
            $( "#exerciseSelector" ).append( "<option value='' selected disabled hidden>Select Exercise...</option>" );
            for(var i = 0; i < exercises.length; i++) {
				$( "#exerciseSelector" ).append( "<option value=" + exercises[i]._id + ">" + exercises[i].name + "</option>" );
			}
        }
	});
}

const parseData = () => {
	count = 1;
	xData = []; 
	yData = []; // this will be integer numbers from 1-# of elements

	// loop through the sets to get all of the weights
	selectedExercise.sets.forEach(function(set) {
		if(set.actweight == undefined || set.actweight == NaN){
			graphable = false;
		} else {
			yData.push(set.actweight)
			xData.push(count);
			count++;
		}
		
	});
	
	createGraph();
}

const createGraph = () => {

	if (graphable) {
		console.log('graphing')
		var h = window.innerHeight*0.5;
		var w = window.innerWidth*0.75;
		var padding = 30;


		var dataset = xData.map(function(e, i) {
		  return [e, yData[i]];
		});

		console.log(dataset)

		d3.max(dataset, function(d) {    //Returns 480
		    return d[0];  //References first value in each sub-array
		});

		var xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[0]; })])
            .range([padding, w - padding*2]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
            .range([h - padding, padding]);

        // Define the div for the tooltip
		var div = d3.select("body").append("div")	
		    .attr("class", "tooltip")				
		    .style("opacity", 0);

		var svg = d3.select("#graph")
		  .append("svg")
		  .attr("width", w)
		  .attr("height", h);

		svg.selectAll("circle")
		  .data(dataset)
		  .enter()
		  .append("circle")
		  .attr("cx", function(d) {
		    return xScale(d[0]);
		  })
		  .attr("cy", function(d) {
		    return yScale(d[1]);
		  })
		  .attr("r", function(d) {
		    return 5;
		  })
		  .attr("fill", "#00aa88")
		  .on("click", function(d) {		
	            div.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            div.html('rep: '+d[0] + "<br/>weight: "  + d[1])
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("losefocus", function(d) {		
	            div.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });

		// svg.selectAll("text")
		//   .data(dataset)
		//   .enter()
		//   .append("text")
		//   .text(function(d) {
		//     return d[1];
		//   })
		//   .attr("x", function(d) {
		//     return xScale(d[0]);
		//   })
		//   .attr("y", function(d) {
		//     return yScale(d[1]);
		//   })
		//   .attr("font-size", "15px")
		//   .attr("fill", "black");

		var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(dataset.length+1);
		
		svg.append("g")
		   .attr("class", "axis")  //Assign "axis" class
		   .attr("transform", "translate(0," + (h - padding) + ")")
		   .call(xAxis);

		var yAxis = d3.svg.axis()
           .scale(yScale)
           .orient("left")
           .ticks(5);

        svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",0)")
		    .call(yAxis);
	} else {
		$("#graph").append("<div class='alert alert-primary' role='alert'>Exercise not graphable</div>")
	}
	
}

$(function() {
	populateExercises(athleteid);

	$('select').on('change',function() {
		// remove alert if it exists
		$('.alert').detach();
		$('#graph').empty();
		selectedExerciseId = this.value;
		// get the selected exercise obj
		exercises.forEach(function(exercise) {
		 	if(exercise._id == selectedExerciseId) {
		 		selectedExercise = exercise;
		 	}
		});
		parseData();
	});
});

