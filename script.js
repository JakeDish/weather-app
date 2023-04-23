const key = '1ca732209a497a64d078aec3d87ab967';




const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  const inputValue = searchInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${key}`
  )
    .then((response) => response.json())
    .then((response) => {
      const lat = response.city.coord.lat;
      const lon = response.city.coord.lon;
      console.log(lat, lon);
      console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.list[0].main.temp);
          document.getElementById("today").innerHTML = `
          <div class="card shadow-0 border">
              <div class="card-body p-4">

                <h4 id="city" class="mb-1 sfw-normal">${data.city.name}, ${data.city.country}</h4>
                <p class="mb-2">Current temperature: <strong>${data.list[0].main.temp}°F</strong></p>
                <p>High: <strong>${data.list[0].main.temp_max}°F</strong>, Low: <strong>${data.list[0].main.temp_min}°F</strong></p>
                <p>Humidity: <strong>${data.list[0].main.humidity}</strong></p>
                <p>Wind Speed: <strong>${data.list[0].wind.speed}mph</strong></p>
                <img class="d-flex flex-row align-items-center">
                <p id="conditions" class="mb-0 me-4">Mostly Sunny</p>
                <img id="conditions-icon" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"></img>
                <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>

              </div>
            </div>
          `;
        });
    });
});

