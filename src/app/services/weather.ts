import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { WeatherData, ForecastData } from '../models/weather.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private apiKey = environment.apiKey;
  private _forecastData = signal<ForecastData | null>(null);
  private _weatherData = signal<WeatherData | null>(null);
  public _loading = signal(false);

  public weatherData = computed(() => Object.freeze(this._weatherData()));

  public forecastData = computed(() => Object.freeze(this._forecastData()));

  public loading = computed(() => this._loading());

  setWeatherData(data: WeatherData | null) {
    this._weatherData.set(data);
  }

  setLoading(isLoading: boolean) {
    this._loading.set(isLoading);
  }

  setForecastData(data: ForecastData | null) {
    this._forecastData.set(data);
  }

  getWeatherByCity(city: string): Observable<WeatherData> {
    const params = new HttpParams().set('q', city).set('appid', this.apiKey).set('units', 'metric');
    return this.http.get<WeatherData>(`${this.baseUrl}/weather`, { params });
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', 'metric');
    return this.http.get<WeatherData>(`${this.baseUrl}/weather`, { params });
  }

  getForecastByCity(city: string): Observable<ForecastData> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('cnt', '40');
    return this.http.get<ForecastData>(`${this.baseUrl}/forecast`, { params });
  }

  getForecastByCoords(lat: number, lon: number): Observable<ForecastData> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('cnt', '40');
    return this.http.get<ForecastData>(`${this.baseUrl}/forecast`, { params });
  }

  getWeatherAndForecast(city: string) {
    return forkJoin({
      weather: this.getWeatherByCity(city),
      forecast: this.getForecastByCity(city),
    });
  }

  getWeatherAndForecastByCoords(lat: number, lon: number) {
    return forkJoin({
      weather: this.getWeatherByCoords(lat, lon),
      forecast: this.getForecastByCoords(lat, lon),
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
