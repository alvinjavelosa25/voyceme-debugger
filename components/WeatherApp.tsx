"use client";
import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(""); // Or hardcode for now

  const fetchWeather = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <input
        className="border p-2 mr-2 text-black"
        placeholder="API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
      />
      <input
        className="border p-2 mr-2 text-black"
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {weather && weather.main && (
        <div className="mt-4">
          <div className="font-bold">{weather.name}</div>
          <div>Temp: {weather.main.temp}°C</div>
          <div>Condition: {weather.weather[0].description}</div>
        </div>
      )}
    </div>
  );
}