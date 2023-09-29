function GetInfo(){
    const newName= document.getElementById("cityInput");
    const cityName= document.getElementById("cityName");
    cityName.innerHTML ="--"

    fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=b63082b3af87e4200982c1544995286c")
.then(response => response.json())
.then(data =>);{
    for(i=0;i<5;i++){
        document.getElementById("day" +(i+1)+"Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min -288.53).toFixed(1)+"°";
    }
    for(i=0;i<5;i++){
        document.getElementById("day" +(i+1)+"Max").innerHTML = "Min:" + Number(data.list[i].main.temp_max -288.53).toFixed(1)+"°";
    }
    for(i=0;i<5;i++){
        document.getElementById("img" +(i+1).src) = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
    }
}}