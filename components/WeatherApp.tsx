"use client";
import { useState } from "react";
import { WeatherCard } from "./WeatherCard";
import { useToast } from "./hooks/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Key } from 'lucide-react';

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
    <div className="weather-card max-w-md mx-auto mb-8">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            OpenWeatherMap API Key
          </Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Enter city name"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchWeather()}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchWeather}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </div>
      </div>
      <WeatherCard weatherData={weather} loading={loading} />
    </div>
  );
}