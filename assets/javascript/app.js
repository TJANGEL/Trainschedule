// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIELQX_mN3WZydTz_eDDxScEcePhYe9UY",
    authDomain: "trainschedule-de17b.firebaseapp.com",
    databaseURL: "https://trainschedule-de17b.firebaseio.com",
    projectId: "trainschedule-de17b",
    storageBucket: "trainschedule-de17b.appspot.com",
    messagingSenderId: "997151371944"
  };
  firebase.initializeApp(config);
  
  var trainData = firebase.database();
  
  // add trains
  $("#add-train-btn").on("click", function() {
  
    // forms for user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    var newTrain = {
  
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    trainData.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clear forms after train is added
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  
    // Determine when the next train arrives.
    return false;
  });
  
  // Add trains to firebase database and populate html tables
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
  
      // Calculate time till arrival
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // Calculate the arrival time
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });