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
function Place(cityName, stateName, countryName) {
  this.cityName = cityName,
  this.stateName = stateName,
  this.countryName = countryName
}

Place.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var myTravels = new Travel();

$(document).ready(function() {
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    var inputtedCityName = $("input#new-city-name").val();
    var inputtedStateName = $("input#new-state-name").val();
    var inputtedCountryName = $("input#new-country-name").val();
    var newPlace = new Place(inputtedCityName, inputtedStateName, inputtedCountryName);
    myTravels.addPlace(newPlace);
    console.log(myTravels.places);
  })
})
