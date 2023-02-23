/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'units=metric&appid=e17ef621c725f0074295007f1760502b';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  let zip =  document.getElementById('zip').value;
  const feelings =  document.getElementById('feelings').value;
  
  if (zip.trim() === '') {
    alert('✅ Zip is empty, Please enter Valid Zip Code');
    return false;
  }else
    zip="&zip="+zip;
  if (feelings.trim() === '') {
    alert('✅ Your feeling is empty, Please enter Your feeling today');
    return false;
  }
  getWeatherData(baseURL,apiKey,zip)
  .then(function(data){
    // Add data
    if(data)
        postData('/save', {temp:data.main.temp, date: newDate,feelings:feelings});
    else
        return false;
  })
  .then((data)=>{
    updateUI()
  });
}

const getWeatherData = async (baseURL, key,zip )=>{
    const res = await fetch(baseURL+key+zip);
    try {

      const data = await res.json();
      if(data.cod == 200)
       return data;
      else
        {
            alert(data.message);
            return false;
        }
    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
  }

  /**************************************  Function to POST data ***********************/
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}



const updateUI = async () => {
    const request = await fetch('/chosenTemp');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML =  `${allData.temp} <sup>o</sup>C` ;
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('content').innerHTML = `Your feelings: ${allData.feelings}`;
  
    }catch(error){
      console.log("error", error);
    }
  }
  

  /**------------------to get country bby zip------------------ */


  document.getElementById('zip').addEventListener('change', (event) => {
    const result = document.querySelector('#zip').value;
    fetch("/getZipCountry?zip="+result)
    .then(async function(response){
      const zipData = await response.json();
      // Add data
      if(zipData){
        document.getElementById('city').innerHTML =  `${zipData.city} ` ;
        document.getElementById('state').innerHTML =  `${zipData.state} ` ;
        document.getElementById('long').innerHTML =  `Longitude: ${zipData.long} ` ;
        document.getElementById('lat').innerHTML =  `Latitude: ${zipData.lat} ` ;
      }
    });   
  });


