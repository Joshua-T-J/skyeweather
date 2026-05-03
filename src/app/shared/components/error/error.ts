import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {
  errorMessage = input.required<string | null>();
}
