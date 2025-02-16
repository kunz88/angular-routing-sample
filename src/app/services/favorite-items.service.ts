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

  favoriteItemsSetter() {
    const items = JSON.parse(
      window.localStorage.getItem('favorite-items') || '[]'
    );
    this.favoriteItems.set(items);
  }

  addItem(item: Item) {
    this.favoriteItems.update((items) => [...items, item]);

    window.localStorage.setItem(
      'favorite-items',
      JSON.stringify(this.favoriteItems())
    );
  }
  deleteItem(item: Item) {
    this.favoriteItems.update((items) => items.filter((i) => i.id !== item.id));
  }
}
