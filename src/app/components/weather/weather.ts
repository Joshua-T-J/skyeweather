import { Component, computed, inject, signal } from '@angular/core';
import { DailyForecast, ForecastItem, Unit } from '../../models/weather.model';
import { Weather as WeatherService } from '../../services/weather';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { TodayCard } from '../today-card/today-card';
import { FiveDayForecast } from '../five-day-forecast/five-day-forecast';
import { Search } from '../../shared/components/search/search';
import { Loader } from '../../shared/components/loader/loader';
import { Error } from '../../shared/components/error/error';
import { ToggleUnit } from '../../shared/components/toggle-unit/toggle-unit';
import { HourlyForecast } from '../today-card/hourly-forecast/hourly-forecast';

@Component({
  selector: 'app-weather',
  imports: [
    FormsModule,
    TitleCasePipe,
    TodayCard,
    FiveDayForecast,
    Search,
    Loader,
    Error,
    ToggleUnit,
    HourlyForecast,
    NgTemplateOutlet,
  ],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {
  private weatherService = inject(WeatherService);

  searchQuery = signal('');
  weatherData = computed(() => this.weatherService.weatherData());
  forecastData = computed(() => this.weatherService.forecastData());
  loading = computed(() => this.weatherService.loading());

  error = signal<string | null>(null);
  unit = signal<Unit>('C');
  activeTab = signal<'today' | 'forecast'>('today');

  bgClass = computed(() => {
    const weather = this.weatherData();
    if (!weather) return 'bg-default';
    const id = weather.weather[0]?.id;
    if (id >= 200 && id < 300) return 'bg-thunder';
    if (id >= 300 && id < 600) return 'bg-rain';
    if (id >= 600 && id < 700) return 'bg-snow';
    if (id >= 700 && id < 800) return 'bg-fog';
    if (id === 800) return 'bg-clear';
    return 'bg-cloudy';
  });

  displayTemp = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '--';
    const t = weather.main.temp;
    return this.unit() === 'C' ? Math.round(t) : Math.round((t * 9) / 5 + 32);
  });

  displayFeelsLike = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '--';
    const t = weather.main.feels_like;
    return this.unit() === 'C' ? Math.round(t) : Math.round((t * 9) / 5 + 32);
  });

  localTime = computed(() => {
    const weather = this.weatherData();
    if (!weather) return '';
    const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const local = new Date(utc + weather.timezone * 1000);
    return local.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
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

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => this.fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => this.fetchByCity('London'),
      );
    } else {
      this.fetchByCity('London');
    }
  }

  onSearch() {
    const q = this.searchQuery().trim();
    if (q) this.fetchByCity(q);
  }

  toggleUnit() {
    this.unit.update((u) => (u === 'C' ? 'F' : 'C'));
  }

  private fetchByCity(city: string) {
    this.weatherService.setLoading(true);
    this.error.set(null);
    this.weatherService.getWeatherAndForecast(city).subscribe({
      next: ({ weather, forecast }) => {
        this.weatherService.setWeatherData(weather);
        this.weatherService.setForecastData(forecast);
        this.weatherService.setLoading(false);
      },
      error: (err) => {
        this.error.set(
          err.status === 404
            ? 'City not found. Please try again.'
            : 'Failed to fetch weather. Check your API key.',
        );
        this.weatherService.setLoading(false);
      },
    });
  }

  private fetchByCoords(lat: number, lon: number) {
    this.weatherService.setLoading(true);
    this.error.set(null);
    this.weatherService.getWeatherAndForecastByCoords(lat, lon).subscribe({
      next: ({ weather, forecast }) => {
        this.weatherService.setWeatherData(weather);
        this.weatherService.setForecastData(forecast);
        this.weatherService.setLoading(false);
      },
      error: () => this.fetchByCity('London'),
    });
  }

  protected onUnitChange(newUnit: Unit) {
    this.weatherService.setUnit(newUnit);
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  getDailyTemp(temp: number): number {
    return this.unit() === 'C' ? temp : Math.round((temp * 9) / 5 + 32);
  }
}
