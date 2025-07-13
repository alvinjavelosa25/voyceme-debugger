"use client";
import { useState } from "react";
import { WeatherCard } from "./WeatherCard";
import { useToast } from "./hooks/use-toast";

export default function WeatherApp() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(""); // Or hardcode for now
  const { toast } = useToast();
  
  const fetchWeather = async () => {
  if (!apiKey.trim()) {
    toast({
      title: "API Key Required",
      description: "Please enter your OpenWeatherMap API key.",
      variant: "destructive"
    });
    return;
  }
  if (!city.trim()) {
    toast({
      title: "City Required",
      description: "Please enter a city name.",
      variant: "destructive"
    });
    return;
  }
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    setWeather(data);
    toast({
      title: "Weather Loaded",
      description: `Weather data for ${data.name} loaded successfully.`,
    });
  } catch {
    toast({
      title: "Error",
      description: "Failed to fetch weather data. Check your API key and city.",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 transition-all duration-700">
      <div className="w-full max-w-md mt-12 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather App</h1>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            className="border p-2 rounded flex-1"
            placeholder="API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
          <input
            className="border p-2 rounded flex-1"
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>
        <WeatherCard weatherData={weather} loading={loading} />
      </div>
    </div>
  );
}