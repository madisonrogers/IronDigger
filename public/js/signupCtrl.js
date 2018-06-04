var server = window.location.origin;
teams = [];

$(document).ready(() => {
	populateTeams();
});

var populateTeams = () => {
	$(function(){
		var path = "/api/allTeams";
		console.log('inside newUserCtrl, getTeams')
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('got all teams');
	            teams = data;
	            console.log(teams)
	            for(var i = 0; i < teams.length; i++) {
					$( "#sportSelector" ).append( "<option value=" + teams[i]._id + ">" + teams[i].name + "</option>" );
				}
	        }
		});
	});
}