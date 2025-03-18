import { error } from "console";
import readline from "readline/promises";

const API_KEY = '3a741c9a4b75bb722a7cb9640154a296';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new error('City not found!! Pls check city name.');
        }
        const weatherData = await response.json();
        console.log(weatherData);
        
        console.log("\nWeather Information: ");
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp}°C`);
        console.log(`Description: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s\n`);
        
    } catch(error) {
        console.log(error);
    }
}

const city = await rl.question('Enter the name of the CITY to get its weather info: ');
await getWeather(city);
rl.close();