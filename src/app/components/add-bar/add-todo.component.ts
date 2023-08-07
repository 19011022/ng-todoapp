import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';


@Component({
  selector: 'app-add-todo',
  template: `
  <div class="text-center p-3">
  <button mat-fab color="primary" (click)="openDialog()">
      <mat-icon>add</mat-icon>
    </button>
  </div>
  `, 
})
export class AddTodoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '400px', // Set the width of the dialog as per your requirement
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed, if needed
    });
  }
}
