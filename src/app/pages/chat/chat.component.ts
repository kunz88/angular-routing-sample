import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  imports: [UsersComponent, RouterOutlet],
})
export class ChatComponent {}
