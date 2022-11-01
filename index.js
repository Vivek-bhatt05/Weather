let key = "6ba7a6a99a555cc795b4d02202930857";
let dat;



async function getweather(){
    try{
        let city=document.getElementById("city").value;
        let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        dat= await res.json();
        console.log(dat);
        display(dat);
    }
    catch(err){
        console.log("err");
    }
}

let map=document.getElementById("gmap_canvas");
let cont=document.getElementById("cont");
function display(data){
    
    cont.innerText="";

    let name=document.createElement("h2");
    name.innerText= `${data.name}`;

    let temp=document.createElement("h2");
    temp.innerText= `${data.main.temp} C`;

    let feels=document.createElement("p");
    feels.innerText=`Feels like ${data.main.feels_like} C.`;

    let mintemp=document.createElement("p");
    mintemp.innerText= `min: ${data.main.temp_min} C`;

    let maxtemp=document.createElement("p");
    maxtemp.innerText= `max: ${data.main.temp_max} C`;

    let humi=document.createElement("p");
    humi.innerText= `Humidity - ${data.main.humidity}%`;

    let pres=document.createElement("p");
    pres.innerText= `Pressure - ${data.main.pressure}hPa`;

    cont.append(name,temp,feels,mintemp,maxtemp,humi,pres);

    // append the map 

    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}




function getcurrent(){
    
    navigator.geolocation.getCurrentPosition(success,error);
    async function success(pos) {
        let  nav = pos.coords;
        let lat=`${nav.latitude}`
        let lon=`${nav.longitude}`
        let res=  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        let dat= await res.json()

        console.log(dat);

        console.log(`Latitude : ${nav.latitude}`);
        console.log(`Longitude: ${nav.longitude}`);
        display(dat);

    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
}
getcurrent();