// ISS Locator -  Using 2 API's to get a map and the location
//                of the Internation Space Station.
//  Author: Mike Glover
//  Date: 29 Mar 2017
//
// Following these videos:
// https://www.youtube.com/watch?v=UNtqhnhD-wo&t=814s
// https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=684s

// http://i.imgur.com/Smk23Zz.png

var mapimg;
var issicon;
var url = 'https://api.wheretheiss.at/v1/satellites/25544';
var isslat = 0;
var isslon = 0;
var issX;
var issY;
var issvel = 0;

// Preload images of Map and ISS icon
function preload() {
  // Get Static Map from Mapbox.com
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v8/static/0,0,1,0,0/1024x600?access_token=pk.eyJ1IjoiZGlnaXRhbGlnaHQiLCJhIjoiY2owdXgwZHdtMDAzdzMzb2tyOWdwNmt5eSJ9.mooXWS4z0D4QFz1RAUH1Eg');
  issicon = loadImage("iss.png");
}

function setup() {
  createCanvas(1024,600);
  // Render Map
  image(mapimg,0,0);
  // Get Location of ISS
  getISSLocation();
  setInterval(getISSLocation,5000);
  // Setup text
  textSize(16);
  textStyle(BOLD);
}

// Function to get data from ISS API
function getISSLocation() {
  loadJSON(url, gotData);
}

// Get latitude, longitude and velocity from Data
function gotData(data) {
  isslat = data.latitude;
  isslon = data.longitude;
  issvel = round(data.velocity * 0.6213712 );
  // Convert lat and long to pixels data
  issY = map(isslat, 90, -90, 0, 600);
  issX = map(isslon, -180, 180, 0, 1024);
}


function draw() {
  imageMode(CORNER);
  // Redraw background to stop blurred icon.
  image(mapimg,0,0);
  imageMode(CENTER);
  // Draw the ISS on the screen
  image(issicon, issX, issY);
  // ellipse(issX, issY, 24, 24);

  // Text information
  text('Lat:         ' + round(isslat), 25, 535);
  text('Long:      ' + round(isslon), 25, 552);
  text('Velocity: ' + issvel + ' mph', 25, 570);
}
