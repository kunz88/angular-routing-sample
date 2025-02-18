import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { FavoriteItemsService } from '../../services/favorite-items.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  private themeService = inject(ThemeService);
  private favoriteService = inject(FavoriteItemsService);
  private routerService = inject(Router);
  counterFavorite = this.favoriteService.counterFavorite;
  private token: string | null = '';

  ngOnInit() {
    this.token = window.localStorage.getItem('tokenZalando');
  }

  setTheme() {
    this.themeService.setTheme();
  }

  onAddItem() {
    console.log('token', this.token);
    if (this.token) {
      this.routerService.navigate(['add']);
    } else {
      this.routerService.navigate(['auth']);
    }
  }
}
