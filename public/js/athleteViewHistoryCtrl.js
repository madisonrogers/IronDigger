const athleteid = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1);
var server = window.location.origin;
var exercises = [];
var selectedExerciseId;
var selectedExercise;
var xData;
var yData;
var repData = [];
var setData = [];
var graphable = true;
var earliestDate;
var latestDate;
var uniqueDates = [];

var server = window.location.origin;

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

const isDateInArray = (needle, haystack) => {
  for (var i = 0; i < haystack.length; i++) {
    if (needle.getTime() === haystack[i].getTime()) {
      return true;
    }
  }
  return false;
}

const parseData = () => {
	count = 1;
	xData = []; 
	yData = []; // this will be the dates the exercise was performed

	// loop through the sets to get all of the weights
	selectedExercise.sets.forEach(function(set) {
		if(set.actweight == undefined || set.actweight == NaN){
			graphable = false;
		} else {
			yData.push(set.actweight);
			repData.push(set.reps);
			setData.push(set.sets);
			var dateStr = set.date;
			var month = parseInt(dateStr.substr(0,dateStr.indexOf('/')));
			dateStr = dateStr.substr(dateStr.indexOf('/') + 1);
			var day = parseInt(dateStr.substr(0,dateStr.indexOf('/')));
			dateStr = dateStr.substr(dateStr.indexOf('/') + 1);
			var year = parseInt(dateStr);
			var date = new Date(year, month, day);
			if(earliestDate == undefined && latestDate == undefined) {
				earliestDate = date;
				latestDate = date;
			} else {
				if(date < earliestDate) {
					earliestDate = date;
				} else if (date > latestDate) {
					latestDate = date;
				}
			}
			if (!isDateInArray(date, uniqueDates)) {
			    uniqueDates.push(date);
			}
			xData.push(date);
		}
		
	});
	
	createGraph();
}

const createGraph = () => {

	if (graphable) {
		// add title
		console.log('graphing')
		var h = window.innerHeight*0.5;
		// var w = window.innerWidth*0.95;
		var w = $('#graph').width();
		console.log(w)
		var padding = 30;


		var dataset = xData.map(function(e, i) {
		  return [e, yData[i], repData[i], setData[i]];
		});

		console.log(dataset)

		d3.max(dataset, function(d) {    //Returns 480
		    return d[0];  //References first value in each sub-array
		});
		// console.log(earliestDate.getDa())
		earliestDate = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), earliestDate.getDate()-1)
		latestDate = new Date(latestDate.getFullYear(), latestDate.getMonth(), latestDate.getDate()+1)
		var xScale = d3.time.scale()
            .domain([earliestDate, latestDate])
            .range([padding, w - padding*3]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
            .range([h - padding, padding]);

        // Define the div for the tooltip
		var div = d3.select("body").append("div")	
		    .attr("class", "tooltip")				
		    .style("opacity", 0);

		var svg = d3.select("#graph")
		  .append("svg")
		  .attr("width", w-2*padding)
		  .attr("height", h+padding)
		  .style("padding-left", padding);

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
		  .attr("fill", "grey")
		  .on("click", function(d) {		
	            div.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            div.html('Date: '+d[0].getMonth()+'/'+d[0].getDate()+'/'+d[0].getFullYear() + "<br/>Set: "+d[3]+"<br/>Reps: " + d[2] + "<br/>Weight: "  + d[1])
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("focusout", function(d) {		
	            div.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });

		var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(5);
		
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

		 // Add the text label for the x axis
	    svg.append("text")
	        .attr("transform", "translate(" + (w / 2) + " ," + (h+padding) + ")")
	        .style("text-anchor", "middle")
	        .text("Date");

	    // Add the text label for the Y axis
	    svg.append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("y", 0-padding)
	        .attr("x",0 - (h / 2))
	        .attr("dy", "1em")
	        .style("text-anchor", "middle")
	        .text("Weight");

	    createTable();

	} else {
		$("#graph").append("<div class='alert alert-primary' role='alert'>Exercise not graphable</div>")
	}
	
}

const createTable = () => {
	// create a th for each distinct date
	for(var i = 0; i < uniqueDates.length; i++) {
		$('#liftingTable').append("<thead id="+i+"><tr><th>Date: "+uniqueDates[i].getMonth()+"/"+uniqueDates[i].getDate()+"/"+uniqueDates[i].getFullYear()+"</th></tr></thead>")

		// loop through all the exercises and make rows for the ones with the matching dates
		$('#'+i).append("<tr id='header'><td>Set</td><td>Rep</td><td>Weight</td></tr>")
		$('#'+i).append("<tbody>");
		for(var j = 0; j < selectedExercise.sets.length; j++) {
			var dateStr = selectedExercise.sets[j].date;
			var month = parseInt(dateStr.substr(0,dateStr.indexOf('/')));
			dateStr = dateStr.substr(dateStr.indexOf('/') + 1);
			var day = parseInt(dateStr.substr(0,dateStr.indexOf('/')));
			dateStr = dateStr.substr(dateStr.indexOf('/') + 1);
			var year = parseInt(dateStr);
			if(month == uniqueDates[i].getMonth() && day == uniqueDates[i].getDate() && year == uniqueDates[i].getFullYear()) {
				// same date
				$('#liftingTable').append("<tr><td>"+selectedExercise.sets[j].sets+"</td><td>"+selectedExercise.sets[j].reps+"</td><td>"+selectedExercise.sets[j].actweight+"</td></tr>");
			}
		}
	}
	$('#liftingTable').append('</tbody>');
}

$(function() {
	populateExercises(athleteid);
	$('#alert').hide()

	$('select').on('change',function() {
		// remove alert if it exists
		$('.alert').detach();
		$('#graph').empty();
		$('#liftingTable').empty();
		selectedExerciseId = this.value;
		// get the selected exercise obj
		exercises.forEach(function(exercise) {
		 	if(exercise._id == selectedExerciseId) {
		 		selectedExercise = exercise;
		 	}
		});
		parseData();
	});

	// on click of update max button, parse the table and update the user
	$('#updateMaxs').click(function() {
		var bench = $('#max0').text();
		var clean = $('#max1').text();
		var squat = $('#max2').text();
		var deadlift = $('#max3').text();
		$(function(){
			var path = "/api/updateMaxs/"+athleteid;
			$.ajax({
				type:'PUT',
				contentType: 'application/json',
				url: server + path,
				data: JSON.stringify({bench: bench, clean: clean, squat: squat, deadlift: deadlift}),				
		        success: function(data) {
		            console.log(data);
		            $('#alert').css('display', 'block');
		        }
			});
		});
	});
});

