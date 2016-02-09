/* Controllers */

//Main Weather Controller
weatherApp.controller('weatherMain',

 function ($scope, $interval, getweather) {

 		//this object
 		var weatherController = this;

 		//Get lat, lng
 		var lat,lng;
 		
 		//Has data been set for each section? Used to control display
 		$scope.currentDaySet = false;
 		$scope.forecastSet = false;
 		
 		//Is the data currently being fetched? Used to show a small loading spinner for visual feedback of this
 		$scope.fetchingToday = false;
 		$scope.fetchingForecast = false;
 		
 		//The main loader shown when no data is present
 		$scope.loadingActive = true;
 		
 		//Results for current day - this is used to control display as it is primary information
 		$scope.currentDay = "";
 		 					
 		//Call the services to get weather from the API		
 		this.updateWeather = function(){
	 		 		
	 		//Currently fetching
	 		$scope.fetchingToday = true;
	 		$scope.fetchingForecast = true;
	 		
	 		//Reset any errors shown
	 		
	 		//For the Current Day weather and 5 Day forecast either show an error message or call the display function depending on outcome
	 		getweather.requestWeather(lat,lng).success(function(data, status)	{	
		       
		        weatherController.setWeatherDay(data);
			}).error(function(){

				$scope.errorMessage = "Cannot get your location, please make sure you have a network connection";
				
			});
	            
	        getweather.request5Day(lat,lng).success(function(data, status)	{	
		        
		      	weatherController.setWeatherForecast(data);
								
			}).error(function(){
				
				$scope.errorMessage = "Cannot get your location, please make sure you have a network connection";
				
			});		
		}	
	
		/*
			Utility function to get data from local storage
			NOTE - IndexedDB would be a more robust option for large datasets if this was to be taken forward as a fully functional app
			
			@param key String  what key to get data for
			
			returns Object	
		*/
        this.getLocalStorage = function(key){
	        var local = localStorage.getItem(key);
	        if (local !== null){
		        local = JSON.parse(local);
		        
		        //set last updated to show user it is old data
		        $scope.lastUpdated = localStorage.getItem("time");
	        }
	        return local;
        }
        
        /*
			Utility function to set data to local storage
			
			@param data Object  the weather data
			@param key String  what key to set data for
		*/
        this.setLocalStorage = function(data, key){
	        	        
	       	var dateTmp = new Date();
	        
			localStorage.setItem(key,JSON.stringify(data));
			localStorage.setItem("time",dateTmp.getTime());
        }
        
        // Get location information using Geo location
        this.getLocation = function () {
            if (navigator.geolocation) {
	            
	             //first run - populate with existing data if this is present to not just show a loading screen
	            if($scope.cursdfrentDaySet){
		            var existingDataDay = weatherController.getLocalStorage("day"),
		            existingDataForecast = weatherController.getLocalStorage("forecast");
		            
		            if(existingDataDay && existingDataForecast){
			            weatherController.setWeatherDay(existingDataDay, true);
						weatherController.setWeatherForecast(existingDataForecast, true);
		            }
	            }
	            
				//Get the lat and lng, if successful request weather
				weatherController.hideErrorGeo();
                navigator.geolocation.getCurrentPosition(this.setPosition, this.showErrorGeo);
                
            }else{
	            weatherController.showErrorGeo();
            }
        }
        
        /*
			Set lat, lng - then get weather
			
			@param pos Object  geo location data
		*/
        this.setPosition = function (pos) {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            
            weatherController.updateWeather();  
        }
        
        //Show an error related to Geolocation problems
        this.showErrorGeo = function () {
	        $scope.errorMessage = "Cannot get your location, please make sure you have a network connection and location services enabled";
	        $scope.errorGeo = true;
	    }
	    
	    //remove Geolocation error
	    this.hideErrorGeo = function () {
	        $scope.errorMessage = false;
	        $scope.errorGeo = false;
	    }
	    
	     /*
			Set weather data for current day
			
			@param pos Object  location data
			@param local boolean is this using local data?
		*/
	    this.setWeatherDay = function(data, local){
		    	
		    	//used for loading spinner
		    	$scope.fetchingToday = false;
		    	$scope.loadingActive = false;

				//Set name of city
				$scope.city = data.name;
				
				//set data
				$scope.currentDay = data;
				$scope.currentDaySet = true;
									
				//set to local storage and set time
				if(!local){
					var dateTmp = new Date();
					$scope.lastUpdated = dateTmp.getTime();
					weatherController.setLocalStorage(data, "day");
				}
	    }
	    
		/*
			Set weather data for forecast
			
			@param pos Object  location data
			@param local boolean is this using local data?
		*/
		this.setWeatherForecast = function(data, local){
		    				
				$scope.fetchingForecast = false;
				
				$scope.forecast = data.list;
				$scope.forecastSet = true;
				
				//set to local storage and set time
				if(!local){
					var dateTmp = new Date();
					$scope.lastUpdated = dateTmp.getTime();
					weatherController.setLocalStorage(data, "forecast");
				}
	    }
	    
	    //Get location    
        this.getLocation();
        
        //refresh data every 30 secs
        $interval(function(){
			weatherController.getLocation();
	  	}.bind(this), 30000);   
        
});