import { Component, computed, inject, input } from '@angular/core';
import { DailyForecast, ForecastItem, Unit } from '../../models/weather.model';
import { Weather } from '../weather/weather';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-five-day-forecast',
  imports: [TitleCasePipe],
  templateUrl: './five-day-forecast.html',
  styleUrl: './five-day-forecast.scss',
})
export class FiveDayForecast {
  private weatherService = inject(Weather);

  readonly unit = computed(() => this.weatherService.unit());
  private readonly forecastData = computed(() => this.weatherService.forecastData());

  protected readonly dailyForecasts = computed<DailyForecast[]>(() => {
    const forecast = this.forecastData();
    if (!forecast) return [];
    const grouped: { [key: string]: ForecastItem[] } = {};
    forecast.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.entries(grouped)
      .slice(0, 5)
      .map(([dateStr, items]) => {
        const date = new Date(dateStr);
        const temps = items.map((i) => i.main.temp);
        const midItem = items[Math.floor(items.length / 2)] || items[0];
        return {
          date,
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          icon: midItem.weather[0]?.icon || '01d',
          description: midItem.weather[0]?.description || '',
          tempMin: Math.round(Math.min(...temps)),
          tempMax: Math.round(Math.max(...temps)),
          humidity: Math.round(items.reduce((s, i) => s + i.main.humidity, 0) / items.length),
          windSpeed: Math.round(midItem.wind.speed * 3.6),
        };
      });
  });

  protected getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  protected getDailyTemp(temp: number): number {
    return this.unit() === 'C' ? temp : Math.round((temp * 9) / 5 + 32);
  }
}
