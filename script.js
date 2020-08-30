

const button = document.getElementById("btn");
const input = document.getElementById("city");
const loc = document.getElementById("loc");
const descrip = document.querySelector(".temperature-description");
const temperatureDegree = document.querySelector(".temperature-degree");
const icon = document.getElementById("icon");
const CF = document.getElementById("cf");

// FETCH and DISPLAY DATA

button.addEventListener("click", () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=9c77706d191b28c05e5cf2396ba601a1 `;      
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.cod !== "404") {
                loc.innerHTML = input.value.toUpperCase();
                let dsc = data.weather[0].description;
                descrip.innerHTML = dsc;
                let temp = data.main.temp;
                let tempCel = Math.floor(temp - 273.15);
                temperatureDegree.innerHTML = tempCel;
                CF.innerHTML = "C";
                let icn = data.weather[0].icon;
                icon.setAttribute("src", `http://openweathermap.org/img/wn/${icn}@2x.png `);
                localStorage.setItem("tempC", tempCel);
            } else {
                descrip.innerHTML = "City NOT found! try again";
            }
        });
});
// from C to F 

CF.addEventListener("click", (e) => {
    if (e.target.id == "cf") {
        var tempS = localStorage.getItem("tempC");
        if (CF.textContent == "C") {
            CF.innerHTML = "F";
            var tempF = (tempS * 9 / 5) + 32;
            temperatureDegree.textContent = "";
            temperatureDegree.innerHTML = tempF;
        }
        else if (CF.textContent == "F") {
            CF.innerHTML = "C";
            temperatureDegree.textContent = "";
            temperatureDegree.innerHTML = tempS;
        }
    }
});





