import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Item, ItemFilters } from '../models/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = signal<Item[]>([]);
  private apiUrl = 'http://localhost:3000/items';
  private httpService = inject(HttpClient);

  loadInitialData(): Observable<Item[]> {
    return this.httpService.get<Item[]>(this.apiUrl).pipe(
      tap((items) =>
        this.items.set(
          items.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }))
        )
      )
    );
  }

  getItems(filters?: ItemFilters): Observable<Item[]> {
    let filteredItems = this.items();

    if (filters) {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredItems = filteredItems.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
      }

      if (filters.gender) {
        const gender = filters.gender?.toLowerCase();
        filteredItems = filteredItems.filter((item) =>
          item.gender.toLowerCase().includes(gender)
        );
      }

      if (filters.category) {
        console.log(filters.category);
        filteredItems = filteredItems.filter(
          (item) => item.category === filters.category?.toLocaleLowerCase()
        );
      }

      if (filters.priceMin) {
        filteredItems = filteredItems.filter(
          (item) => item.price >= filters.priceMin!
        );
      }

      if (filters.priceMax) {
        filteredItems = filteredItems.filter(
          (item) => item.price <= filters.priceMax!
        );
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
          case 'date_desc':
            filteredItems.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );
            break;
        }
      }
    }

    return of(filteredItems).pipe(delay(300)); // Simula latenza di rete
  }

  getItem(id: number): Observable<Item | undefined> {
    return this.httpService.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Metodi aggiuntivi per CRUD operations
  createItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.httpService.post<Item>(this.apiUrl, item).pipe(
      tap((newItem) => {
        const currentItems = this.items();
        this.items.set([...currentItems, newItem]);
      })
    );
  }

  updateItem(id: number, item: Partial<Item>): Observable<Item> {
    return this.httpService.patch<Item>(`${this.apiUrl}/${id}`, item).pipe(
      tap((updatedItem) => {
        const currentItems = this.items();
        const index = currentItems.findIndex((i) => i.id === id);
        if (index !== -1) {
          currentItems[index] = updatedItem;
          this.items.set([...currentItems]);
        }
      })
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentItems = this.items();
        this.items.set(currentItems.filter((item) => item.id !== id));
      })
    );
  }
}
