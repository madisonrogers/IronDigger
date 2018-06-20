var athleteId;
var phases;
var selectedPhase;
var server = window.location.origin;

// this is called first
const getUserId = (userId) => {
  athleteId = userId;
  console.log(athleteId)
}

const getPhases = () => {
  var path = "/api/allPhases/"+athleteId;
  $.ajax({
    type:'GET',
    contentType: 'application/json',
        url: server + path,           
        success: function(data) {
            console.log('got all phases');
            phases = data;
            console.log(phases)
            $( "#phaseSelector" ).append( "<option value='' selected disabled hidden>Select Phase...</option>" );
            for(var i = 0; i < phases.length; i++) {
        $( "#phaseSelector" ).append( "<option value=" + phases[i]._id + ">" + phases[i].name + "</option>" );
      }
        }
  });
}

const populateWorkouts = () => {
  for(var i = 0; i < selectedPhase.workouts.length; i++) {
    $('#w').append('<div id=workout'+i+'>'+selectedPhase.workouts[i].name+'<br/>Date: '+selectedPhase.workouts[i].date+'<i class="float-right fas fa-angle-down"></i></dib>');

    // populate the blocks 
    var blocks = selectedPhase.workouts[i].blocks
    for(var j = 0; j < blocks.length; j++) {
      $('#workout'+i).attr('onclick', 'showBlocks('+i+','+j+',event)').append('<div id=block'+i+''+j+' style="display: none;">'+blocks[j].name+'<i class="float-right fas fa-angle-down"></i></div>');

      // populate the exercises
      var exercises = blocks[j].exercises;
      console.log(exercises);
      for(var z = 0; z < exercises.length; z++) {
        $('#block'+i+''+j).attr('onclick', 'showExercises('+i+','+j+','+z+',event)').append('<div id="exercise'+i+''+j+''+z+'" style="display: none;">'+exercises[z].name+'<i class="float-right fas fa-angle-down"></i></div>');

        // populate the sets, reps, and percentage in an editable table
        var sets = exercises[z].sets;
        $('#exercise'+i+''+j+''+z).attr('onclick', 'showSets('+i+','+j+','+z+',event)').append("<table class='table' id='liftingTable"+i+j+z+"' style='display: none;'></table>")
        $('#liftingTable'+i+j+z).append("<tr id='header"+i+''+j+''+z+"'><td>Set</td><td>Rep</td><td>Percentage</td><td>Actual Weight</td></tr>")
        for(var s = 0; s < sets.length; s++) {
          $('#liftingTable'+i+j+z).attr('onclick', 'showTable(event)').append("<tr id='set"+i+''+j+''+z+''+s+"'><td>"+sets[s].set+"</td><td>"+sets[s].reps+"</td><td>"+sets[s].percent+"</td><td id='actualWeight' contenteditable='true'></td></tr>");
        }
      }
      $('#workout'+i).append("<button id='button"+i+"' type='button' class='btn btn-secondary btn-sm' onclick='saveWorkout("+i+",event)'>Submit Workout</button>");
    }
  }
}

const showBlocks = (i,j,event) => {
  if($('#block'+i+j).css('display') == 'none') {
    $('#block'+i+j).css('display','block');
    $('#block'+i+j).siblings().css('display', 'block');
  } else {
    $('#block'+i+j).css('display','none');
  }
  event.stopPropagation();
}

const showExercises = (i,j,z,event) => {
  if($('#exercise'+i+j+z).css('display') == 'none') {
    $('#exercise'+i+j+z).css('display', 'block');
    $('#exercise'+i+j+z).siblings().css('display', 'block');
  } else {
    $('#exercise'+i+j+z).css('display', 'none');
    $('#exercise'+i+j+z).siblings().css('display', 'none');
  }
  event.stopPropagation();
}

const showSets = (i,j,z,event) => {
  if($('#liftingTable'+i+j+z).css('display') == 'none') {
    $('#liftingTable'+i+j+z).css('display', 'block');
  } else {
    $('#liftingTable'+i+j+z).css('display', 'none');
  }
  event.stopPropagation();
}

const showTable = (event) => {
  event.stopPropagation();
}

const saveWorkout = (i, event) => {
  event.stopPropagation();

  var workout = selectedPhase.workouts[i];
  
  // loop through blocks
  for(var j = 0; j < workout.blocks.length; j++) {
    var currBlock = workout.blocks[j];
    // loop through current block to get exercises
    for(var k = 0; k < currBlock.exercises.length; k++) {
      var currExercise = currBlock.exercises[k];
      // loop through exercises to get sets
      for(var l = 0; l < currExercise.sets.length; l++) {
        // in the workout object, set the inputted value for the current set
        workout.blocks[j].exercises[k].sets[l].actweight = $('#set'+i+j+k+l+' #actualWeight').text(); 
      }
    }
  }
  console.log(workout);
  console.log(server+'api/updateWorkout/'+athleteId+'/'+selectedPhase._id+'/'+workout._id)
  // save workout 
  $.ajax({
      url: server+'/api/updateWorkout/'+athleteId+'/'+selectedPhase._id+'/'+workout._id,
      type: 'PUT',    
      data: JSON.stringify(workout),
      contentType: 'application/json',
      success: function(result) {
          console.log('Workout has been submitted')
          $('#alert').append("<div class='alert alert-success' role='alert'>Your Workout Has Been Saved</div>")
      }
  });
}

$(document).ready(function() {
  getPhases();
  $('#alert').empty();

  $('select').on('change',function() {
    $('#w').empty();
    selectedPhaseId = this.value;
    // get the selected exercise obj
    phases.forEach(function(phase) {
      if(phase._id == selectedPhaseId) {
        selectedPhase = phase;
      }
    });
    populateWorkouts();
  });
});