import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayCard } from './today-card';

describe('TodayCard', () => {
  let component: TodayCard;
  let fixture: ComponentFixture<TodayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
