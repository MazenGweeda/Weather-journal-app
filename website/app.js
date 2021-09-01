//declare global variables................................................................
const zipTextArea=document.querySelector("#zip");
const feelingArea=document.querySelector("#feelings");
const generateButton=document.querySelector("#generate");

const date =document.querySelector("#date");
const cityName =document.querySelector("#city");
const temp =document.querySelector("#temp");
const realFeel =document.querySelector("#realFeel");
const description =document.querySelector("#description");
const userFeel =document.querySelector("#content");

const key= '95d7b40dccf121ff6fa4bdef6a62c451';//key to 'openweathermap.com' api.
const keyName='Udacity project';

//declare functions.........................................................................

//continously check if the two text areas are empty or not......
function updateButtonStatus(){
    if(zipTextArea.value!=="" && feelingArea.value!==""){
       generateButton.disabled = false;
       generateButton.className="buttonEnabled";
    }else{
        generateButton.disabled = true;
        generateButton.className="buttonDisabled";
    }

    setTimeout(updateButtonStatus,100);
}

//Get date function.................
function getDate(){
    const _date = new Date();
    return "Date: " + _date.getDate() + "/" + (_date.getMonth()+1) + "/" + _date.getFullYear();
}


generateButton.addEventListener("click",function(){
    //add press effect...
    generateButton.classList.add("pressed");
    setTimeout(function(){generateButton.classList.remove("pressed")},200);

    //request the api data (using the city name entered by user) from "openweathermap.com"...
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+zipTextArea.value+"&appid="+key+"&units=metric")
        .then(response=>{
            if(response.ok)
                return response.json();
            else{
                return null;
            }})
        .then(data=>{
            if(data!=null)
            {
                //succeeded request......
                console.log(data);

                postData('/addData', {
                    date: getDate(),
                    city: data['name'],
                    temprature: data['main']['temp'],
                    real_feel: data['main']['feels_like'],
                    des: data['weather'][0]['description'],
                    user_feel: feelingArea.value});

                getData("/data")
            }
            else
            {
                //failed request.........
                console.log("error happened!");

                date.textContent = getDate();
                cityName.textContent = '" ' + zipTextArea.value + ' " is not a valid zip or city name.';
                temp.textContent =  " please check the zip/name and try again";
                realFeel.textContent = "";
                description.textContent = "";
                userFeel.textContent = "";
            }
                        
                })});

//call functions...........................................
setTimeout(updateButtonStatus,100);


//function to post data to server..........................
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


  //function to get data from server and add it to website ui.......
  const getData= async (url="",_data={})=>{
     fetch(url).then(response=>{
         if(response.ok)
            return response.json();
         else
            return null;})
     .then(data=>{
         if(data!=null){
             date.innerHTML = data.date;
            cityName.innerHTML = "City: " + data.city;
            temp.innerHTML = "Temprature: " + data.temprature + " °C";
            realFeel.innerHTML = "Feels like: " + data.real_feel + " °C";
            description.innerHTML = "description: " + data.des;
            userFeel.innerHTML = "User feels: " + data.user_feel;
         }

     })
  }


