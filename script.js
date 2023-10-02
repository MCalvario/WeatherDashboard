const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");


    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
    .then(response => response.json())
    .then(data => {
    
        //Getting Weather Icons
         for(i = 0; i<5; i++){
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon
            +".jpg";
        }
        
        console.log(data)
    
    
    })
    
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
    }
    
    
    //Getting and displaying the text for the upcoming five days of the week
    var d = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    
    //Function to get the correct integer for the index of the days array
    function CheckDay(day){
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
        }
    }
    
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
        }
