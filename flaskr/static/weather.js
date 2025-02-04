//  weather.js
  window.onload = function () {
    fetch('/weather_data')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching weather data:', data.details);
          document.getElementById('forecast').innerHTML = '<p>Failed to load weather data</p>';
          return;
        }
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = data.forecast.forecastday.map((day, index) => {
          const date = new Date(day.date);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = index === 0 ? 'Today' : date.toLocaleDateString('en-US', options);
          return `
          <div class="weather-card">
            <h2>${data.location.name} - ${formattedDate}</h2>
            <img src="${day.day.condition.icon}" alt="Weather Icon">
            <p>${day.day.condition.text}</p>
            <p>Max Temp: ${day.day.maxtemp_c}&deg;C</p>
            <p>Min Temp: ${day.day.mintemp_c}&deg;C</p>
          </div>
        `;
        }).join('');
        // Store location in localStorage for AI script to use
        localStorage.setItem('location', data.location.name);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('forecast').innerHTML = '<p>Failed to load weather data</p>';
      });
  };
