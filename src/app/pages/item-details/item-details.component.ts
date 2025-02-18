import { Component, inject, input, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { take } from 'rxjs';
import { FavoriteItemsService } from '../../services/favorite-items.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  id = input.required<string>();
  item: Item | undefined;

  itemService = inject(ItemService);
  favoriteItemsService = inject(FavoriteItemsService);
  private routerService = inject(Router);

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

  deleteItem() {
    this.itemService.deleteItem(+this.id()).subscribe((item) => {
      console.log(item);
    });
    this.routerService.navigate(['items']);
  }
}
