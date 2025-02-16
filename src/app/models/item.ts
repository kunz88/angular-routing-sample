export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  location: string;
  images: string;
  seller: {
    name: string;
    rating: number;
  };
  createdAt: Date;
}

export interface ItemFilters {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  sortBy?: 'date_desc' | 'price_asc' | 'price_desc';
}
