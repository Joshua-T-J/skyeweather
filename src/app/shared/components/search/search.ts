import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchQuery = model.required<string>();
  search = output<string>();

  onSearch() {
    this.search.emit(this.searchQuery());
  }
}
