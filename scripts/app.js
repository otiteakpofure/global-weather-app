const cityForm = document.querySelector("form");
const card= document.querySelector(".card");
const details = document.querySelector(".details");
const time= document.querySelector("img.time");
const icon= document.querySelector (".icon img");
const bodyChange = document.querySelector("body")

const updateUI = (data)=>{
    //  const cityDets = data.cityDets;
    //  const weather= data.weather;

     const {cityDets, weather}= data;

     //update details template

     details.innerHTML=`<h5 class="my-3">Cityname: ${cityDets.EnglishName}</h5>
     <div class="my-3">Weather-Info: ${weather.WeatherText}</div>
     <div class="display-4 my-4">
      <span> ${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>

     </div> `



     //update the night and day icons

     const iconSrc= `img/icons/${weather.WeatherIcon}.svg`
     icon.setAttribute("src",iconSrc)

     let timeSrc=null;

     if(weather.IsDayTime){
        timeSrc = "img/day.svg"
        bodyChange.style.backgroundColor="grey"
        
     }
     else{
        timeSrc="img/night.svg"
        bodyChange.style.backgroundColor="blue"
     }

     time.setAttribute("src", timeSrc);





     //remove the d-none class if present 

     if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
     }
}

// updating city using async
const updateCity = async (city)=>{

    const cityDets= await getCities(city);
    const weather= await getWeather(cityDets.Key);
    
    return {
        cityDets: cityDets,
        weather:weather
    }
}

cityForm.addEventListener("submit", formChange)

function formChange(e){
    e.preventDefault()
    //get city value  while trimming (which is removing any white space and also reseting the value so that what a user types does not remain there)
    const city = cityForm.city.value.trim()
    cityForm.reset()
    
    //updating the Ui with the new city 
    updateCity(city).then((data)=>{
        updateUI(data)
    }).catch((err)=>{
        console.log(err)
    });
}