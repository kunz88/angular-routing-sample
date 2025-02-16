// components/search-filters/search-filters.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ItemFilters } from '../../models/item';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SearchFiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<ItemFilters>();

  filterForm!: FormGroup;
  activeFilters: number = 0;
  isFiltersVisible = false;

  readonly categories = [
    { id: 'electronics', label: 'Elettronica' },
    { id: 'vehicles', label: 'Veicoli' },
    { id: 'clothing', label: 'Abbigliamento' },
    { id: 'home-garden', label: 'Casa e Giardino' },
    { id: 'sports', label: 'Sport' },
    { id: 'other', label: 'Altri' },
  ];

  readonly sortOptions = [
    { value: 'date_desc', label: 'Più recenti' },
    { value: 'price_asc', label: 'Prezzo crescente' },
    { value: 'price_desc', label: 'Prezzo decrescente' },
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  get formControls() {
    return this.filterForm.controls;
  }

  ngOnInit(): void {
    this.setupFormSubscription();
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      query: [''],
      category: [''],
      min: [''],
      max: [''],
      location: [''],
      sortBy: [''],
    });
  }

  private setupFormSubscription(): void {
    // Monitora i cambiamenti del form con debounce
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((formValue) => this.updateActiveFiltersCount(formValue))
      )
      .subscribe((formValue) => {
        const filters: ItemFilters = this.transformFormToFilters(formValue);
        this.filterChange.emit(filters);
      });
  }

  private transformFormToFilters(formValue: any): ItemFilters {
    const filters: ItemFilters = {};

    console.log('Form value:', formValue);

    if (formValue.query?.trim()) {
      filters.query = formValue.query.trim();
    }

    if (formValue.category) {
      filters.category = formValue.category;
    }

    if (formValue.min) {
      filters.priceMin = Number(formValue.min);
    }

    if (formValue.max) {
      filters.priceMax = Number(formValue.max);
    }

    if (formValue.location?.trim()) {
      filters.location = formValue.location.trim();
    }

    if (formValue.sortBy) {
      filters.sortBy = formValue.sortBy;
    }

    return filters;
  }

  private updateActiveFiltersCount(formValue: any): void {
    this.activeFilters = Object.values(formValue).filter(Boolean).length;
  }

  toggleFilters(): void {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  resetFilters(): void {
    this.filterForm.patchValue({
      query: '',
      category: '',
      min: '',
      max: '',
      location: '',
      sortBy: 'date_desc',
    });
  }

  // Helper per validazione input prezzo
  onPriceInput(event: Event, control: 'min' | 'max'): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Rimuovi caratteri non numerici
    const numericValue = value.replace(/[^0-9]/g, '');

    if (value !== numericValue) {
      this.filterForm.get('priceRange')?.get(control)?.setValue(numericValue);
    }
  }
}
