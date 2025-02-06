import { Routes } from '@angular/router';
import { NoTaskComponent } from './app/tasks/no-task/no-task.component';
import { UserTasksComponent } from './app/users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './app/tasks/new-task/new-task.component';
import { TasksComponent } from './app/tasks/tasks.component';
import { NotFoundComponent } from './app/not-found/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks', // lo utilizziamo per settare la rout a task component
        // perchè non abbiamo altre informazione nella route /users/:userId
        pathMatch: 'prefix', // importante se siam nella route 'root' va impostata a full
      },
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
