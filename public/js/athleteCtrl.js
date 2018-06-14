var server = window.location.origin;
athletes = [];

//$(document).ready(() => {
//	populateAthletes();
//});

var populateAthletes = ($teamid, $groupid) => {
	$(function(){
		var path = "/api/getathletesgroup/"+$teamid+"/"+$groupid;
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
								var image;
								if(athletes[i].profile.picture){
									$image = ".profile.picture";
								}
								else {
									$image = ".gravatar(60)";
								}
								//$( "#exampleModal .modal-body" ).append( "<div><a href='/api/getUser/" + athletes[i]._id + "' value=" + athletes[i]._id + ">"  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</option></div>" );
								$( "#exampleModal .modal-body" ).append( "<div><a href='/views/athlete' value=" + athletes[i]._id + ">"  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</option></div>" );
				}
	        }
		});
	});
}
