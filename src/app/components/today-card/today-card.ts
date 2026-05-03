import { Component, computed, inject, input } from '@angular/core';
import { Weather } from '../../services/weather';
import { Unit } from '../../models/weather.model';
import { HourlyForecast } from './hourly-forecast/hourly-forecast';

@Component({
  selector: 'app-today-card',
  imports: [],
  templateUrl: './today-card.html',
  styleUrl: './today-card.scss',
})
export class TodayCard {
  private weatherService = inject(Weather);

  protected readonly weatherData = computed(() => this.weatherService.weatherData());
  protected readonly unit = computed(() => this.weatherService.unit());

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
}
