import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayForecast } from './five-day-forecast';

describe('FiveDayForecast', () => {
  let component: FiveDayForecast;
  let fixture: ComponentFixture<FiveDayForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveDayForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDayForecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
