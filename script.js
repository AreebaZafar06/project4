function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = 'd59cfdcc8d3f4dea4b56828b0d380463'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
                const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds

                // Format sunrise and sunset times
                const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
                const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

                const cityName = data.name;
                const country = data.sys.country;
                weatherInfo.innerHTML = `
                    <p>Weather in ${cityName}, ${country}: ${temperature}°C, ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Sunrise: ${sunriseTime}</p>
                    <p>Sunset: ${sunsetTime}</p>
                `;
            } else {
                weatherInfo.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
