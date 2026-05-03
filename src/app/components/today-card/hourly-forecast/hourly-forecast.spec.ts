import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecast } from './hourly-forecast';

describe('HourlyForecast', () => {
  let component: HourlyForecast;
  let fixture: ComponentFixture<HourlyForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyForecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
