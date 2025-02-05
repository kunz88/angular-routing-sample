import { Component, inject } from '@angular/core';

import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [UserComponent],
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;

  search(searchTerm: string) {
    this.users = this.usersService.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
