"use client";
import { useState } from "react";
import { WeatherCard } from "./WeatherCard";

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
        <WeatherCard weatherData={weather} loading={loading} />
      )}
    </div>
  );
}