var server = window.location.origin;
athletes = [];

var populateAthletes = ($teamid, $groupid) => {
	$(function(){
		var path = "/api/getathletesgroup/"+$teamid+"/"+$groupid;
		console.log('inside groupCtrl, getAthletes');
		console.log($teamid + ' ' + $groupid);
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('got all athletes in group');
	            athletes = data;
	            console.log(athletes)
							var $userid;
	            for(var i = 0; i < athletes.length; i++) {
								var image;
								if(athletes[i].profile.picture){
									$image = ".profile.picture";
								}
								else {
									$image = ".gravatar(60)";
								}
								//$( "#exampleModal .modal-body" ).append( "<div><a href='/api/getUser/" + athletes[i]._id + "' value=" + athletes[i]._id + ">"  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</option></div>" );
								$userid = athletes[i]._id;
								$( "#exampleModal .modal-body" ).append( "<div><a href='/views/athlete/" + $userid + "' value=" + athletes[i]._id + ">"  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</option></div>" );
	        }
				}
		});
	});
}

var populateAllAthletes = ($teamid) => {
	$(function(){
		var path = "/api/getathletesteam/"+$teamid;
		console.log('inside groupCtrl, getAllAthletes');
		console.log($teamid);
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('got all athletes in group');
	            athletes = data;
	            console.log(athletes)
							var $userid;
	            for(var i = 0; i < athletes.length; i++) {
								var image;
								if(athletes[i].profile.picture){
									$image = ".profile.picture";
								}
								else {
									$image = ".gravatar(60)";
								}
								$userid = athletes[i]._id;
								$( "#exampleModal .modal-body" ).append( "<div><a href='/views/athlete/" + $userid + "' value=" + athletes[i]._id + ">"  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</option></div>" );
	        }
				}
		});
	});
}
