import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todoes',
  template: `
    <div class="fixed-height-todoes-container shadow p-1 mb-3 bg-white">
    <div class="d-flex justify-content-start">
      <h2 class="mx-5 mt-2">Completed Todoes</h2>
      <button mat-icon-button color="primary" (click)="$event.stopPropagation(); todoAccordions = !todoAccordions">
          <mat-icon>expand_more</mat-icon>
      </button>
      </div>
      <hr>
      <div *ngFor="let todo of this.todoService.todoes">
        <app-todo [todo]="todo" [accordions]="todoAccordions"></app-todo>
      </div>
    </div>

    <div class="fixed-height-completed-container shadow p-1 mb-3 bg-white">
      <div class="d-flex justify-content-start">
      <h2 class="mx-5 mt-2">Completed Todoes</h2>
      <button mat-icon-button color="primary" (click)="$event.stopPropagation(); completedTodoAccordions = !completedTodoAccordions">
          <mat-icon>expand_more</mat-icon>
      </button>
      </div>

    <hr>
      <div *ngFor="let todo of this.todoService.completedTodoes">
        <app-todo [todo]="todo" [accordions]="completedTodoAccordions"></app-todo>
      </div>
    </div>
  `
})
export class TodoesComponent implements OnInit {
  constructor(public todoService: TodoService) { }

  screenRatioIsLikePhone: boolean = (window.innerHeight / window.innerWidth) >= 1;
  todoAccordions: boolean;
  completedTodoAccordions: boolean;

  ngOnInit(): void {
    this.todoAccordions = !this.screenRatioIsLikePhone;
    this.completedTodoAccordions = !this.screenRatioIsLikePhone;
  }

    // deleteAllTodoes() {
  //   this.todoService.allTodoes.forEach(todo => this.todoService.deleteTodo(todo.Id).subscribe(
  //     (data) => {
  //       this.todoService.allTodoes.pop();
  //       this.todoService.fixLists();
  //     },
  //     (error) => console.log("Yapılacaklar listesi alınamadı:", error)
  //   )
  //   )
  // }
}
