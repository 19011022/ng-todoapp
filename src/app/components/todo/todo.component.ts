import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoService } from 'src/app/services/todo.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  template: `
<mat-accordion class="example-headers-align" multi>
  <mat-expansion-panel  class="m-2" [expanded]="accordions">
    <mat-expansion-panel-header>

    <mat-panel-title 
      [class.bg-info]="priority.value === 'Low'" 
      [class.bg-warning]="priority.value === 'Medium'" 
      [class.bg-danger]="priority.value === 'High'" 
      class="rounded h-75 w-25">
      <mat-checkbox #ref (change)="onCheck(ref.checked)" [checked]="todo.IsCompleted"></mat-checkbox>
      <mat-panel-title [class.completed-todo-text]="todo.IsCompleted" class="text-white">
        {{todo.Title}}
      </mat-panel-title>
    </mat-panel-title>

    <mat-panel-description class="w-50 row">
      <h5 class="mx-2 text">
        <i>{{todo.CreatedDate | date}}</i>
      </h5>
      <div class="col  text-nowrap" style="max-width: 7rem;">
      {{todo.Detail}} 
      </div>
    </mat-panel-description>

      <mat-panel-description class="justify-content-end" style="max-width: 5rem;">
        <button mat-icon-button color="primary" (click)="$event.stopPropagation()" [routerLink]="['/details', this.todo.Id]">
          <mat-icon>info</mat-icon>
        </button>

        <button mat-icon-button color="warn" (click)="$event.stopPropagation(); openDeleteDialog()">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-panel-description>
    </mat-expansion-panel-header>

    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput [formControl]="title" (change)="updateTodo()">
    </mat-form-field>

    <mat-form-field class="mx-3">
      <mat-label>Detail</mat-label>
      <textarea cdkTextareaAutosize matInput [formControl]="detail" (change)="updateTodo()"></textarea>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Priority</mat-label>
        <mat-select [formControl]="priority" (selectionChange)="updateTodo()">
          <mat-option value="Low">Low</mat-option>
          <mat-option value="Medium">Medium</mat-option>
          <mat-option value="High">High</mat-option>
        </mat-select>
    </mat-form-field> 
  </mat-expansion-panel>
  `,
  standalone: true,
  imports: [MatBadgeModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, RouterModule, CommonModule],
})
export class TodoComponent implements OnInit {
  @Input() todo: any;
  @Input() accordions: boolean;
  todoForm: FormGroup;
  title: any;
  detail: any;
  priority: any;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  ngOnInit(): void {
    this.title = new FormControl(this.todo.Title, [Validators.required, Validators.maxLength(128)])
    this.detail = new FormControl(this.todo.Detail, Validators.maxLength(512))
    this.priority = new FormControl(this.todo.Priority == 0 ? "Low" : this.todo.Priority == 1 ? "Medium" : "High")

    this.todoForm = this.formBuilder.group({
      title: this.title,
      detail: this.detail,
      priority: this.priority
    });
  }

  onCheck(checked: boolean) {
    this.todo.IsCompleted = checked;
    this.todoService.putTodo(this.todo).subscribe();
    this.todoService.fixLists()
  }

  updateTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    this.todo.Title = this.todoForm.value.title;
    this.todo.Detail = this.todoForm.value.detail;
    this.todo.Priority = this.todoForm.value.priority;

    console.log(this.todo.Priority);
    

    this.todoService.putTodo(this.todo).subscribe();
    this.todoService.fixLists();
  }

  openDeleteDialog() {
    if (confirm("Are you sure to delete?")) {
      this.deleteTodo()
    }
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.Id).subscribe()
    this.todoService.allTodoes = this.todoService.allTodoes.filter(todo => todo.Id !== this.todo.Id)
    this.todoService.fixLists()
  }
}
