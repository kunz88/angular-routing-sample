import { computed, Injectable, signal } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class FavoriteItemsService {
  private favoriteItems = signal<Item[]>([]);

  counterFavorite = computed(() => this.favoriteItems().length);

  get favoriteItemsGetter() {
    return this.favoriteItems;
  }

  addItem(item: Item) {
    this.favoriteItems.update((items) => [...items, item]);
  }
  deleteItem(item: Item) {
    this.favoriteItems.update((items) => items.filter((i) => i.id !== item.id));
  }
}
