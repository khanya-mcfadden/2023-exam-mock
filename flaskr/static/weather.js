//  s for weather page 
//  hid location  

    document.getElementById('find-me').addEventListener('click', () => {
    document.querySelector('.hid-location').style.display = 'block';
    });

    document.getElementById('hide-me').addEventListener('click', () => {
    document.querySelector('.hid-location').style.display = 'none';
    document.getElementById('status').textContent = '';
    document.getElementById('city-name').textContent = '';
    document.getElementById('map-link').textContent = '';
    document.getElementById('lat-lon').textContent = '';
    });


 {/* specifies the weather api features  */}

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
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('forecast').innerHTML = '<p>Failed to load weather data</p>';
        });



//  lat and long toggle  

    function toggleLatLon() {
        const checkbox = document.getElementById('lat-lon-checkbox');
        const cityName = document.getElementById('city-name');
        const latLon = document.getElementById('lat-lon');
        if (checkbox.checked) {
            latLon.style.display = 'block';
        } else {
            latLon.style.display = 'none';
        }
    }

//  find location code 

    document.getElementById('find-me').addEventListener('click', () => {
        const status = document.getElementById('status');
        const cityName = document.getElementById('city-name');
        const mapLink = document.getElementById('map-link');
        const latLon = document.getElementById('lat-lon');

        // Check if Geolocation is available
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser.';
            return;
        }

        status.textContent = 'Locating…';

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Update the map link
                mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                mapLink.textContent = `View on Map`;

                // Reverse geocoding to get the city name
                try {
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    if (data && data.city) {
                        cityName.textContent = `City: ${data.city}`;
                        latLon.textContent = `Lat: ${latitude}, Lon: ${longitude}`;
                    } else {
                        cityName.textContent = `Lat: ${latitude}, Lon: ${longitude}`;
                        latLon.textContent = '';
                    }
                    status.textContent = '';
                } catch (error) {
                    status.textContent = 'Failed to fetch city name.';
                }
            },
            () => {
                status.textContent = 'Unable to retrieve your location.';
            }
        );
    });


 updateLocation 

    function updateLocation() {
        const newLocation = document.getElementById('locationInput').value;
        document.getElementById('location').textContent = newLocation;

        fetch(`/weather_data?location=${encodeURIComponent(newLocation)}`)
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
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('forecast').innerHTML = '<p>Failed to load weather data</p>';
            });
    }
