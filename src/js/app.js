var weatherApp = angular.module("weatherApp", []);

weatherApp.run();

//Get Weather data from API
weatherApp.factory('getweather', function($http) {
	
	//The appid would be stored in a more secure place however for demo purposes its in here
	//$q.defer() would be another option to set up this API, but a simple $http call is sufficient here
	var serviceObj = {},
		appid = '222048e7e6577ed4b50c0d154ee28a8d',
		units = "metric";
	
	//return 5 day forecast
	serviceObj.request5Day = function(lat,lng) {
		return $http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lng +'&appid=' +  appid + '&cnt=5&units=' + units 
		});
	};
	
	//return current day forecast
	serviceObj.requestWeather = function(lat,lng) {
		return $http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng +'&appid=' +  appid + '&cnt=5&units=' + units

		});
	};

	return serviceObj;

});