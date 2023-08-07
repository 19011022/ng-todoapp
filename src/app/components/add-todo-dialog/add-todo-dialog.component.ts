import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo-dialog',
  template: `
  <mat-dialog-content>
    <form [formGroup]="todoForm" (ngSubmit)="postTodo()" class="text-center">
      <h4>New To-Do</h4>
      <div>
        <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput [formControl]="title">
      </mat-form-field>
      </div>
      
      <div>
        <mat-form-field>
        <mat-label>Created Date</mat-label>
        <input matInput [matDatepicker]="dp1" [value]="createDate.value" disabled>
        <mat-datepicker #dp1></mat-datepicker>
        </mat-form-field>
      </div>

      <div>
        <mat-checkbox [formControl]="isCompleted">Is Completed?</mat-checkbox>
      </div>

      <div>
      <mat-form-field>
        <mat-label>Detail</mat-label>
        <textarea matInput [formControl]="detail"></textarea>
      </mat-form-field>
      </div>

      <div>
        <mat-form-field>
          <mat-label>Priority</mat-label>
          <mat-select [formControl]="priority">
          <mat-option value="Low">Low</mat-option>
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="High">High</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="my-2 pt-2">
        <button mat-raised-button color="warn" (click)="closeTheDialog()" class="mx-2">Close</button>
        <button mat-raised-button color="primary" type="submit" class="mx-2 w-50">Create</button>
      </div>
      
    </form>
  </mat-dialog-content>
  `
})
export class AddTodoDialogComponent implements OnInit {
  todoForm: FormGroup;
  title = new FormControl('', [Validators.required, Validators.maxLength(128)])
  createDate = new FormControl({value: new Date(), disabled: true}, Validators.required)
  isCompleted = new FormControl(false, Validators.required)
  detail = new FormControl('', Validators.maxLength(512))
  priority = new FormControl('Low')

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, public dialogRef: MatDialogRef<AddTodoDialogComponent>,) {}

   ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title : this.title,
      createDate : this.createDate,
      isCompleted : this.isCompleted,
      detail : this.detail,
      priority : this.priority
    });
  }

  postTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }

    this.todoService.postTodo(this.todoForm.value).subscribe(
      (data) => {
        this.todoService.allTodoes.push(data);
        this.todoService.fixLists();
      },
      (error) => console.error('Yapılacaklar listesi alınamadı:', error)
    );

    this.closeTheDialog()
  }

  closeTheDialog(){
    this.dialogRef.close()
  }
}

