import { Component, inject, input, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { take } from 'rxjs';
import { FavoriteItemsService } from '../../services/favorite-items.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  id = input.required<string>();
  item: Item | undefined;

  itemService = inject(ItemService);
  favoriteItemsService = inject(FavoriteItemsService);

  ngOnInit() {
    console.log('id:', this.id());
    this.itemService
      .getItem(+this.id())
      .pipe(take(1))
      .subscribe((item) => (this.item = item));
  }

  addToCart() {
    this.favoriteItemsService.addItem(this.item!);

    console.log(this.favoriteItemsService.favoriteItemsGetter());
  }
}
