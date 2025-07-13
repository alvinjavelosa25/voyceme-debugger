import React from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

export const WeatherCard = ({ weatherData, loading }: WeatherCardProps) => {
  if (loading) {
    return (
      <div className="p-6 border rounded shadow animate-pulse bg-white/20 text-center">
        Loading...
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="p-6 border rounded shadow bg-white/20 text-center">
        Enter your API key and city to see weather data.
      </div>
    );
  }

  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const description = weatherData.weather[0].description;

  return (
    <div className="p-6 border rounded shadow bg-white/20 max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">{weatherData.name}</h2>
      <div className="text-4xl font-bold mb-2">{temp}°C</div>
      <div className="capitalize mb-2">{description}</div>
      <div className="text-sm text-gray-700 mb-2">Feels like {feelsLike}°C</div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <div>Humidity: {weatherData.main.humidity}%</div>
        <div>Wind: {weatherData.wind.speed} m/s</div>
        <div>Pressure: {weatherData.main.pressure} hPa</div>
        <div>Visibility: {Math.round(weatherData.visibility / 1000)} km</div>
      </div>
    </div>
  );
};