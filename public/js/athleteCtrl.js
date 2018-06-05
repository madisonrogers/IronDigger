var server = window.location.origin;
athletes = [];

//$(document).ready(() => {
//	populateAthletes();
//});

var populateAthletes = ($teamid, $groupid) => {
	$(function(){
		var path = "/api/getathletesgroup/:teamid/:groupid";
		console.log('inside athleteCtrl, getAthletes');
		console.log($teamid + ' ' + $groupid);
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('got all athletes in group');
	            athletes = data;
	            console.log(athletes)
	            for(var i = 0; i < athletes.length; i++) {
					$( "#exampleModal" ).append( "<option value=" + athlete[i]._id + ">" + athlete[i].name + "</option>" );
				}
	        }
		});
	});
}
