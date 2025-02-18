import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-add-new-items',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-items.component.html',
  styleUrl: './add-new-items.component.css',
})
export class AddNewItemsComponent {
  private destroyRef = inject(DestroyRef);
  private routerService = inject(Router);
  showModal = false;

  readonly categories = [
    { id: 'tutine', label: 'Tutine' },
    { id: 'pigiami', label: 'Pigiami' },
    { id: 'scarpe', label: 'Scarpe' },
    { id: 'vestiti', label: 'Vestiti' },
    { id: 'sport', label: 'Sport' },
    { id: 'altri', label: 'Altri' },
  ];

  readonly gender = ['boy', 'girl', 'unisex'];

  itemService = inject(ItemService);

  newItemForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    price: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    category: new FormControl('', {
      validators: [Validators.required],
    }),
    gender: new FormControl('', {
      validators: [Validators.required],
    }),
    images: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const title = this.newItemForm.value.title;
    const category = this.newItemForm.value.category;
    const description = this.newItemForm.value.description;
    const images = this.newItemForm.value.images;
    const gender = this.newItemForm.value.gender;
    const price = Number(this.newItemForm.value.price);

    if (title && category && description && images && price && gender) {
      const newItem = {
        title,
        category,
        description,
        images,
        gender,
        price,
        seller: { name: 'test', rating: 5 },
        createdAt: new Date(),
      } as const satisfies Omit<Item, 'id'>;
      this.itemService
        .createItem(newItem)
        .subscribe((item) => console.log(item));
      alert('Prodotto aggiunto con successo');

      this.routerService.navigate(['items']);
    } else {
      alert('impossibile aggiungere prodotto , compilare i campi');
    }
  }
}
