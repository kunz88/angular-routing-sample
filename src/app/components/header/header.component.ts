import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { RouterLink } from '@angular/router';
import { FavoriteItemsService } from '../../services/favorite-items.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private favoriteService = inject(FavoriteItemsService);

  counterFavorite = this.favoriteService.counterFavorite;

  setTheme() {
    this.themeService.setTheme();
  }
}
