import { Routes } from '@angular/router';
import { ItemListComponent } from './app/pages/item-list/item-list.component';
import { NotFoundComponent } from './app/pages/not-found/not-found/not-found.component';
import { ItemDetailsComponent } from './app/pages/item-details/item-details.component';
import { AuthComponent } from './app/pages/auth/auth.component';
import { FavoritesComponent } from './app/pages/favorites/favorites.component';
import { AddNewItemsComponent } from './app/pages/add-new-items/add-new-items.component';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  {
    path: 'items',
    component: ItemListComponent,
  },
  {
    path: 'items/:id',
    component: ItemDetailsComponent,
  },
  {
    path: 'add',
    component: AddNewItemsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**', // utilizzato come fallback in caso di route non trovata
    component: NotFoundComponent,
  },
];
