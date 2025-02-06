import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TaggedTemplateExpr } from '@angular/compiler';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  activateRouteService = inject(ActivatedRoute);
  userId = input.required<string>();
  tasksService = inject(TasksService);
  /*   order = input<'asc' | 'desc'>(); */ // esempio che utilizza i signals
  order = signal<'asc' | 'desc'>('asc');

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
        } else {
          return new Date(b.dueDate).getDate() - new Date(a.dueDate).getDate();
        }
      })
  );

  ngOnInit(): void {
    const subscription = this.activateRouteService.queryParams.subscribe(
      (queryParams) => {
        this.order.set(queryParams['order']);
      }
    );
  }
}
