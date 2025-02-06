import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = signal<string>('');
  private activatedRoute = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  ngOnInit(): void {
    const subscription = this.activatedRoute.params.subscribe((data) => {
      this.userId.set(data['userId']);
    });
  }

  userName = computed(() => {
    return this.usersService.users.find((user) => user.id === this.userId())
      ?.name;
  });
}
