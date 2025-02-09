const apiKey = 'f821fafbe62e4d7a9a271702250902'; // Replace with your WeatherAPI key

async function getWeather() {
    const city = document.getElementById('city').value;

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('error-message').textContent = "City not found!";
            document.getElementById('weather-info').style.display = 'none';
            return;
        }

        document.getElementById('error-message').textContent = "";
        
        const temperature = data.current.temp_c;
        const weather = data.current.condition.text;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_kph;  // Wind speed is in km/h
        const locationName = `${data.location.name}, ${data.location.country}`;
        const weatherCode = data.current.condition.code;

        let weatherIcon = "";
        let weatherEmoji = "";

        // Determine the weather condition emoji and icon
        if (weatherCode >= 1000 && weatherCode < 1030) {
            weatherIcon = "☀️";
            weatherEmoji = "Sunny";
        } else if (weatherCode >= 1030 && weatherCode < 1200) {
            weatherIcon = "☁️";
            weatherEmoji = "Cloudy";
        } else if (weatherCode >= 1200 && weatherCode < 1240) {
            weatherIcon = "🌧️";
            weatherEmoji = "Rainy";
        } else if (weatherCode >= 1240) {
            weatherIcon = "🌨️";
            weatherEmoji = "Snowy";
        }

        document.getElementById('location-name').textContent = locationName;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('weather').textContent = `${weather} ${weatherEmoji}`;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('wind-speed').textContent = windSpeed;
        document.getElementById('weather-icon').textContent = weatherIcon;

        document.getElementById('weather-info').style.display = 'block';
    } catch (error) {
        document.getElementById('error-message').textContent = "Error fetching weather data!";
        document.getElementById('weather-info').style.display = 'none';
    }
}
