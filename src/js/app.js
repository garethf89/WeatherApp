var weatherApp = angular.module("weatherApp", []);

weatherApp.run(function () {
	
});

weatherApp.factory('getweather', function($http) {
	
	var serviceObj = {},
		units = "metric";
	 
	serviceObj.request5Day = function(lat,lng) {
		return $http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lng +'&appid=222048e7e6577ed4b50c0d154ee28a8d&cnt=5&units=' + units 
		});
	};
	
	serviceObj.requestWeather = function(lat,lng) {
		return $http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng +'&appid=222048e7e6577ed4b50c0d154ee28a8d&cnt=5&units=' + units

		});
	};

	return serviceObj;

});

/* Controllers */

weatherApp.controller('weatherMain',

 function ($scope, $interval, getweather) {

 		//Get lat, lng
 		var lat,lng;
 		
 		$scope.currentDaySet = false;
 		$scope.forecastSet = false;
 					
 		$scope.updateWeather = function(){
	 		getweather.requestWeather(lat,lng).success(function(data, status)	{	
		        
				console.log(data);
				$scope.city = data.name;
				
				$scope.currentDay = data;
				$scope.currentDaySet = true;
				
				var dateTmp = new Date();
				$scope.lastUpdated = dateTmp.getTime();
				
			});
	            
	        getweather.request5Day(lat,lng).success(function(data, status)	{	
		        
				console.log(data);
				
				$scope.forecast = data.list;
				$scope.forecastSet = true;
				
				var dateTmp = new Date();
				$scope.lastUpdated = dateTmp.getTime();
				
			});		
		}	
		
		$scope.currentDay = "";

        this.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setPosition, this.showError);
            }
        }
        
        this.setPosition = function (pos) {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            
            $scope.updateWeather();  
            
        }
        
        this.showError = function () {
        }
 
        this.getLocation();
        
        //object for storing data
        $interval(function(){
			this.updateWeather();
	  	}.bind(this), 30000);    
         
         
         
        
        
});