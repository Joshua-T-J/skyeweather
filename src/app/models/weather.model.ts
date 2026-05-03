export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number; gust?: number };
  visibility: number;
  clouds: { all: number };
  dt: number;
  timezone: number;
  coord: { lat: number; lon: number };
}

export interface ForecastData {
  list: ForecastItem[];
  city: { name: string; country: string };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  dt_txt: string;
}

export interface DailyForecast {
  date: Date;
  dayName: string;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
}

export type Unit = 'C' | 'F';
