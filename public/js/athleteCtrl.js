var server = window.location.origin;
athletes = [];
athletesForGroup = [];

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

var $teamid_g;

var populateCreateGroup = ($teamid) => {
	$teamid_g = $teamid;
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
							$( "#groupModal .modal-body" ).append("<form><div class='form-group'> <label for='groupname'>Enter Group Name</label><input type='text' class='form-control' id='groupname' placeholder='Group Name'></div> <label>Select Athletes</label>" ); 
	            for(var i = 0; i < athletes.length; i++) {
								var image;
								if(athletes[i].profile.picture){
									$image = ".profile.picture";
								}
								else {
									$image = ".gravatar(60)";
								}
								$userid = athletes[i]._id;
								$( "#groupModal .modal-body" ).append("<div class='checkbox'><label><input type='checkbox' value=" + athletes[i]._id + "> "  + athletes[i].profile.first+ ' ' + athletes[i].profile.last + "</label></div>" );
	        }
				}
		});
	});
}


var createGroup = () => {
	$(function(){
			alert($teamid_g);
			$groupname = document.getElementById('groupname').value;

			$("input:checkbox:checked").each(function(){
   			athletesForGroup.push($(this).val());
			});
			for (i = 0; i < athletesForGroup.length; i++)
  			document.writeln(athletesForGroup[i]);
	});
}
