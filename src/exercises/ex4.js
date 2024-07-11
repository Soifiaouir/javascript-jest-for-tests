// ex4.js

export const fetchData = async () => {
  const longitude = 44.83; // Bordeaux longitude
  const latitude = -0.57; // Bordeaux latitude
  const api_key = '891fcaaa0f613df11046ed15bd1a4607'; // API Key
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

  try {
    const response = await fetch(api_url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// script.js
import { fetchData } from './ex4.js';

function displayData() {
  const paragraphContainer = document.getElementById('paragraph-container');
  const paragraph = document.getElementById('paragraph');
  const removeButton = document.getElementById('remove-paragraph-button');

  removeButton.addEventListener('click', () => {
    paragraph.remove();
  });

  fetchData()
    .then(data => {
      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
      paragraph.textContent = `Current temperature in Bordeaux: ${temperature}°C`;
    })
    .catch(error => {
      console.error('Error:', error);
      paragraph.textContent = 'Failed to fetch weather data';
    });
}

document.addEventListener('DOMContentLoaded', displayData);