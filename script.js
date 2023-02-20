

var lat;
var long;
var temperature;
var icon;
var toggle = "F"
var userLocation

function successHandler(location) {
    
   lat=  location.coords.latitude
   long=  location.coords.longitude
    
    getWeatherInfo(lat,long);
    getLocation(lat,long);
  
   
}
function errorHandler(error) {
    alert('Attempt to get location failed: ' + error.message);
}




function getCelsius(val){
  var celsius = Math.floor((val - 32) * 5/9);
  return celsius;
}


function toggleUnits(){
 
 if( toggle ==  "F"){

   $("#temperature").html(temperature+ "&deg;F")
   toggle = "C"
 }else if (toggle == "C"){
   $("#temperature").html(getCelsius(temperature) + "&deg;C");
   toggle = "F"
 }
}

function getLocation(lat,long){

  $.ajax({
    url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-US&apiKey=(API_KEY)`,
    dataType : "json",
    success:function(data){
      
       userLocation = data.items[0].address.city;
      html = "<div class><h1>" + userLocation + "</h1></div>";
         
      $('#city').html(html);
      getImage();
      
    }

  })
}




function getWeatherInfo (lat,long) {  
  $.ajax({
    type:'GET',
    dataType:'jsonp',
    url: "https://api.darksky.net/forecast/(API KEY)/" +lat+","+long,
    success: function(data){
      var location = data.timezone;
      var currentWeather = data.currently.summary;
       temperature = Math.floor(data.currently.temperature);
       icon = data.currently.icon;
     
     
        getGiphy(icon);
        iconChecker(icon);
        toggleUnits();
        console.log(temperature + 'this is temperature')
      
     $('#temperature').html(temperature + "&deg;F")
     $('#info').html("The current weather is " + currentWeather.toLowerCase())
         
    },
     error: function(e) {
         console.dir(e);
       
      }

  })
}


function getCityCordinates(city) {
  $.ajax({
    url: `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=(API_KEY)`,
    dataType : "json",
    success:function(data){
      
       lat = data.items[0].position.lat;
       long = data.items[0].position.lng;
       userLocation = data.items[0].address.city;
      html = "<div class><h1>" + userLocation + "</h1></div>";
         
      $('#city').html(html);
      getWeatherInfo(lat,long);
      getImage();
      
    }

  })

}



function getGiphy(icon){
  console.log(icon)
  console.log("test")
  if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night" || icon == "cloudy"){
    var icon = "clouds";
  }else if (icon == "clear-day" || icon == "clear-night"){
    var icon = "beach";
  }else if (icon == "sleet"){
    var icon = "snow";
  }
  
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q=" + icon + "&limit=100&rating=pg&api_key=(API_KEY)",
    type:"GET",
    dataType:"json",
    success:function(data){
      var rand = Math.floor(Math.random() *30);
      console.log(data)
      
     var giphy = data.data[rand].images.fixed_height.url || data.data[rand].images.original.url;
      html = "<img src=\"" + giphy + " \" class= \"center-block img-responsive\" id=\"gif-image\">";
      
      $('#gif').html(html);
    }
    })
}

 



function iconChecker (icon) {
  
    var skycons = new Skycons({"color": "white"});
  
    
  
  switch (icon){
    case "snow":
      skycons.add("icon1", Skycons.SNOW);
      skycons.play();
      break;
    case "sleet":
      skycons.add("icon1", Skycons.SLEET);
      skycons.play();
      break;
    case "clear-day":
      skycons.add("icon1", Skycons.CLEAR_DAY);
      skycons.play();
      break;
      case "clear-night":
      skycons.add("icon1", Skycons.CLEAR_NIGHT);
      skycons.play();
      break;
    case "fog":
      skycons.add("icon1", Skycons.FOG);
      skycons.play();
      break;
    case "rain":
      skycons.add("icon1", Skycons.RAIN);
      skycons.play();
      break;
    case "cloudy":
      skycons.add("icon1", Skycons.CLOUDY);
      skycons.play();
      break;
    case "wind":
      skycons.add("icon1", Skycons.WIND);
      skycons.play();
      break;
    case "partly-cloudy-night":
      skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
      skycons.play();
      break;
    case "partly-cloudy-day":
      skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
      skycons.play();
      break;
  }
}

function search(ele) {
  if(event.key === 'Enter') {
     
      getCityCordinates(ele.value);
  }
}


navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
