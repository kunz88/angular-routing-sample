import { Routes } from '@angular/router';
import { UserTasksComponent } from './app/users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './app/tasks/new-task/new-task.component';
import { TasksComponent } from './app/tasks/tasks.component';
import { ItemListComponent } from './app/pages/item-list/item-list.component';
import { NotFoundComponent } from './app/pages/not-found/not-found/not-found.component';
import { ItemDetailsComponent } from './app/pages/item-details/item-details.component';
import { PlayerComponent } from './app/pages/player/player.component';
import { AuthComponent } from './app/pages/auth/auth.component';
import { FavoritesComponent } from './app/pages/favorites/favorites.component';

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
    path: 'player',
    component: PlayerComponent,
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
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      },
    ],
  },
  {
    path: '**', // utilizzato come fallback in caso di route non trovata
    component: NotFoundComponent,
  },
];
