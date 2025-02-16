import { Component, inject, OnInit, signal } from '@angular/core';
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

  ngOnInit() {
    this.favoriteItemsService.favoriteItemsSetter();
    this.favoriteItems.set(this.favoriteItemsService.favoriteItemsGetter());

    console.log(this.favoriteItems());
  }
}
