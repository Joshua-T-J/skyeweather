import { Component, computed, inject } from '@angular/core';
import { Weather } from '../../weather/weather';

@Component({
  selector: 'app-hourly-forecast',
  imports: [],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.scss',
})
export class HourlyForecast {
  private weatherService = inject(Weather);

  private readonly forecastData = computed(() => this.weatherService.forecastData());
  private readonly unit = computed(() => this.weatherService.unit());

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

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }
}
