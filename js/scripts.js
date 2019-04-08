// Business Logic for Travel ---------
function Travel() {
  this.places = [],
  this.currentId = 0
}

Travel.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}

Travel.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Travel.prototype.findPlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        return this.places[i];
      }
    }
  };
  return false;
}

Travel.prototype.deletePlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        delete this.places[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Places ---------
function Place(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Place.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var travel = new Travel();

function displayPlaceDetails(travelToDisplay) {
  var placesList = $("ul#places");
  var htmlForPlaceInfo = "";
  travelToDisplay.places.forEach(function(place) {
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.firstName + " " + place.lastName + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
};

function showPlace(placeId) {
  var place = travel.findPlace(placeId);
  $("#show-place").show();
  $(".city-name").html(place.firstName);
  $(".state-name").html(place.lastName);
  $(".phone-number").html(place.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
}

function attachPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    travel.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(travel);
  });
};

$(document).ready(function() {
  attachPlaceListeners();
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    var inputtedCityName = $("input#new-city-name").val();
    var inputtedStateName = $("input#new-state-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    $("input#new-city-name").val("");
    $("input#new-state-name").val("");
    $("input#new-phone-number").val("");
    var newPlace = new Place(inputtedCityName, inputtedStateName, inputtedPhoneNumber);
    travel.addPlace(newPlace);
    displayPlaceDetails(travel);
  })
})
