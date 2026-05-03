import { Component, model } from '@angular/core';

@Component({
  selector: 'app-toggle-unit',
  imports: [],
  templateUrl: './toggle-unit.html',
  styleUrl: './toggle-unit.scss',
})
export class ToggleUnit {
  unit = model<'C' | 'F'>('C');

  toggleUnit() {
    this.unit.set(this.unit() === 'C' ? 'F' : 'C');
  }
}
