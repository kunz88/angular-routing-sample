import { Component, OnInit, inject } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { RouterLink } from '@angular/router';
import { Item, ItemFilters } from '../../models/item';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  standalone: true,
  imports: [SearchFiltersComponent, RouterLink],
})
export class ItemListComponent implements OnInit {
  private itemService = inject(ItemService);

  items: Item[] = [];
  loading = false;
  currentFilters: ItemFilters = {};

  ngOnInit(): void {
    this.itemService.loadInitialData().subscribe({
      next: (items) => {
        this.items = items;
      },
    });
  }

  applyFilters(filters: ItemFilters): void {
    this.currentFilters = filters;
    this.loadItems();
  }

  private loadItems(): void {
    this.loading = true;

    this.itemService.getItems(this.currentFilters).subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel caricamento degli elementi:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  }

  loadMore(): void {}

  refresh(): void {
    this.loadItems();
  }

  onItemClick(item: Item): void {
    console.log('Elemento cliccato:', item);
  }
}
