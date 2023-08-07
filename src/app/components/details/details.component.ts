import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoService } from 'src/app/services/todo.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-details',
  template: `
  <div class="text-center mt-3 shadow p-3 mb-3 bg-white">
    <button mat-fab color="basic" [routerLink]="['/']">
        <mat-icon>home</mat-icon>
    </button>
  </div>

  <div *ngIf="this.todo" class="text-center shadow bg-white rounded w-75 mx-auto p-5">
      <div class="mb-3">
        <mat-checkbox #ref (change)="onCheck(ref.checked)" [checked]="todo.IsCompleted">Is Completed</mat-checkbox>
      </div>
      
      <div>
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput [formControl]="title" (change)="updateTodo()">
        </mat-form-field>
      </div>

      <div>
        <mat-form-field>
          <mat-label>Detail</mat-label>
          <textarea cdkTextareaAutosize matInput [formControl]="detail" (change)="updateTodo()"></textarea>
        </mat-form-field>
      </div>
      <div>
        <mat-form-field>
            <mat-label>Priority</mat-label>
            <mat-select [formControl]="priority" (selectionChange)="updateTodo()">
              <mat-option value="Low">Low</mat-option>
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="High">High</mat-option>
            </mat-select>
        </mat-form-field> 
      </div>

      <button mat-fab color="warn" (click)="openDeleteDialog()" class="mt-3">
        <mat-icon>delete</mat-icon>
      </button>
  </div>
  `,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, RouterModule],
})
export class DetailsComponent implements OnInit {
  @Input() todo: any;
  todoForm: FormGroup;
  title: any;
  detail: any;
  priority: any;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private todoService: TodoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.todoService.getTodo(this.id).subscribe((data) => {
        this.todo = data;
        this.title = new FormControl(this.todo.Title, [Validators.required, Validators.maxLength(128)])
        this.detail = new FormControl(this.todo.Detail, Validators.maxLength(512))
        this.priority = new FormControl(this.todo.Priority == 0 ? "Low" : this.todo.Priority == 1 ? "Medium" : "High")
        
        this.todoForm = this.formBuilder.group({
          title: this.title,
          detail: this.detail,
          priority: this.priority
        });
      },
        (error) => {
          console.log(error)
        });
    })
  }

  onCheck(checked: boolean) {
    this.authService.checkToken()

    console.log(checked);
    
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

    this.todoService.putTodo(this.todo).subscribe()
    this.todoService.fixLists();
  }

  openDeleteDialog() {
    if (confirm("Are you sure to delete?")) {
      this.deleteTodo()
    }
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.Id).subscribe(
      (data) => this.router.navigate(['/']),
      (error) => console.log(error))
  }
}
