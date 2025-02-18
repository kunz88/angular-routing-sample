import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../models/item';
import { FavoriteItemsService } from '../../services/favorite-items.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favoriteItems = signal<Item[]>([]);
  favoriteItemsService = inject(FavoriteItemsService);

  removeItem(item: Item) {
    this.favoriteItemsService.deleteItem(item);
    this.favoriteItems.set(this.favoriteItemsService.favoriteItemsGetter());
  }

  totalPrice = computed(() => {
    return this.favoriteItems().reduce((acc, item) => acc + item.price, 0);
  });

  ngOnInit() {
    this.favoriteItems.set(this.favoriteItemsService.favoriteItemsGetter());
  }
}
