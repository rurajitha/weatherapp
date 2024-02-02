async function getWeather() {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value.trim();

  if (location !== '') {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        displayWeather(data);
      } else {
        displayError(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      displayError('Failed to fetch weather data. Please try again.');
    }
  }
}

function displayWeather(data) {
  const weatherDetails = document.getElementById('weather-details');
  weatherDetails.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
  `;
}

function displayError(message) {
  const weatherDetails = document.getElementById('weather-details');
  weatherDetails.innerHTML = `<p style="color: #e74c3c;">Error: ${message}</p>`;
}
