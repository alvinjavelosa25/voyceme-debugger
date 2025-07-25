"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from './hooks/use-toast';
import { WeatherCard } from './WeatherCard';
import { WeatherAnimations } from './WeatherAnimations';
import { ThemeToggle } from './ThemeToggle';
import { Key } from 'lucide-react';

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

export const WeatherApp = () => {
  const [apiKey, setApiKey] = useState('');
  const [city, setCity] = useState('Manila');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState('bg-gradient-rainy');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();

  const getWeatherBackground = (weatherMain: string) => {
    const suffix = isDarkMode ? '' : '-day';
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return `bg-gradient-sunny${suffix}`;
      case 'clouds':
        return `bg-gradient-cloudy${suffix}`;
      case 'rain':
      case 'drizzle':
        return `bg-gradient-rainy${suffix}`;
      case 'snow':
        return `bg-gradient-snowy${suffix}`;
      case 'thunderstorm':
        return `bg-gradient-stormy${suffix}`;
      default:
        return `bg-gradient-cloudy${suffix}`;
    }
  };

  const handleThemeChange = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
    if (weatherData) {
      setBackgroundClass(getWeatherBackground(weatherData.weather[0].main));
    }
  };

  const fetchWeather = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeatherMap API key",
        variant: "destructive"
      });
      return;
    }
    if (!city.trim()) {
      toast({
        title: "City Required",
        description: "Please enter a city name",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error('Weather data not found');
      const data = await response.json();
      setWeatherData(data);
      setBackgroundClass(getWeatherBackground(data.weather[0].main));
      toast({
        title: "Weather Updated",
        description: `Weather data for ${data.name} has been loaded`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please check your API key and city name.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openweather-api-key');
    if (savedApiKey) setApiKey(savedApiKey);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('weather-theme');
    const isDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (weatherData) {
      setBackgroundClass(getWeatherBackground(weatherData.weather[0].main));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiKey.trim()) {
      localStorage.setItem('openweather-api-key', apiKey);
    }
  }, [apiKey]);

  const weatherType = weatherData?.weather[0]?.main?.toLowerCase() || '';

  return (
    <div className={`transition-all duration-700 ${backgroundClass} relative overflow-hidden`}>
      <WeatherAnimations weatherType={weatherType} />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center relative">
            <div className="absolute top-0 right-0 z-50">
              <ThemeToggle onThemeChange={handleThemeChange} />
            </div>
          </div>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && fetchWeather()}
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
          </div>
          <WeatherCard weatherData={weatherData} loading={loading} />
        </div>
      </div>
    </div>
  );
};