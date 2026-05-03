import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleUnit } from './toggle-unit';

describe('ToggleUnit', () => {
  let component: ToggleUnit;
  let fixture: ComponentFixture<ToggleUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
