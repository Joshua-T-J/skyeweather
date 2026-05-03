import { Component, computed, inject, input } from '@angular/core';
import { Weather } from '../../services/weather';
import { Unit } from '../../models/weather.model';

@Component({
  selector: 'app-today-card',
  imports: [],
  templateUrl: './today-card.html',
  styleUrl: './today-card.scss',
})
export class TodayCard {
  readonly unit = input.required<Unit>();

  private weatherService = inject(Weather);

  private readonly forecastData = computed(() => this.weatherService.forecastData());
  protected readonly weatherData = computed(() => this.weatherService.weatherData());

  protected readonly hourlyForecast = computed(() => {
    const forecast = this.forecastData();
    if (!forecast) return [];
    return forecast.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      temp:
        this.unit() === 'C'
          ? Math.round(item.main.temp)
          : Math.round((item.main.temp * 9) / 5 + 32),
      icon: item.weather[0]?.icon || '01d',
      description: item.weather[0]?.description || '',
    }));
  });

  protected readonly displayFeelsLike = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '--';
    const t = weather.main.feels_like;
    return this.unit() === 'C' ? Math.round(t) : Math.round((t * 9) / 5 + 32);
  });

  protected readonly visibilityKm = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '--';
    return (weather.visibility / 1000).toFixed(1);
  });

  protected readonly windDirection = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '';
    const deg = weather.wind.deg;
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  });

  protected readonly sunriseTime = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '';
    return new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });

  protected readonly sunsetTime = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '';
    return new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }
}
