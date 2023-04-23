const key = "1ca732209a497a64d078aec3d87ab967";

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  document.getElementById("future").innerHTML = "";
  document.getElementById("today").innerHTML = "";
  const inputValue = searchInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      const lat = response.city.coord.lat;
      const lon = response.city.coord.lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          let city = data.city.name;
          let cities = JSON.parse(localStorage.getItem('cities') || []);
          console.log(city);
          cities.push(city);
          localStorage.setItem("cities", JSON.stringify(cities));
          document.getElementById("previous-cities").innerHTML +=`
          <p>${city}</p>
          `
          document.getElementById("today").innerHTML = `
          <div class="card shadow-0 border">
              <div class="card-body p-4">

                <h4 id="city" class="mb-1 sfw-normal">${data.city.name}, ${data.city.country}</h4>
                <p class="mb-2">Current temperature: <strong>${data.list[0].main.temp}</strong></p>
                <p>High: <strong>${data.list[0].main.temp_max}°F</strong>, Low: <strong>${data.list[0].main.temp_min}°F</strong></p>
                <p>Humidity: <strong>${data.list[0].main.humidity}</strong></p>
                <p>Wind Speed: <strong>${data.list[0].wind.speed}mph</strong></p>
                <img class="d-flex flex-row align-items-center">
                <p id="conditions" class="mb-0 me-4">Mostly Sunny</p>
                <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"></img>
                <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>

              </div>
            </div>
            `;
          for (let i = 7; i <= 40; i += 8) {
            const element = data.list[i];
            document.getElementById("future").innerHTML += `
                 <div class="col-4"> 
                <div class="card shadow-0 border">
                  
                    <div class="card-body p-4">

                      <h4 id="city" class="mb-1 sfw-normal">${data.city.name}, ${data.city.country}</h4>
                      <p class="mb-2">Date: <strong>${data.list[i].dt_txt}</strong></p>
                      <p>High: <strong>${data.list[i].main.temp_max}°F</strong>, Low: <strong>${data.list[i].main.temp_min}°F</strong></p>
                      <p>Humidity: <strong>${data.list[i].main.humidity}</strong></p>
                      <p>Wind Speed: <strong>${data.list[i].wind.speed}mph</strong></p>
                      <img class="d-flex flex-row align-items-left">
                      <p id="conditions" class="mb-0 me-4">Mostly Sunny</p>
                      <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"></img>
                      <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>

                    </div>
                    </div>
                  </div>  
                `;
          }
        });
    });
});
