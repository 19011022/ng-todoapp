import { AfterContentChecked, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { CommonModule, formatDate } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-selector',
  template: `
    <mat-form-field *ngIf="dateMode" class="example-full-width">
      <mat-label>Choose a date</mat-label>
      <input matInput #ref [matDatepicker]="picker" (dateChange)="onDate(ref.value)" [value]="currentDate.value">
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker touchUi #picker></mat-datepicker>
    </mat-form-field>
  `,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, CommonModule],
})
export class DateSelectorComponent implements OnInit, OnChanges{
  selectedDate: string;
  currentDate = new FormControl(new Date());
  @Input() dateMode: boolean;

  constructor(private dateAdapter: DateAdapter<Date>, private todoService: TodoService) {
    this.dateAdapter.setLocale('tr-TR');
  }

  ngOnChanges(){
    this.onDate(this.selectedDate);
  }

  ngOnInit(): void {
    this.selectedDate = formatDate(this.currentDate.value, 'dd.MM.yyyy', 'en-US')
    this.onDate(this.selectedDate);
  }

  onDate(date: string) {
    this.selectedDate = date;
    this.getTodoes()
  }

  getTodoes() {
    this.todoService.getTodoes().subscribe(
      (data) => {
        this.todoService.allTodoes = this.dateMode ? data.filter(todo => formatDate(todo.CreatedDate, 'dd.MM.yyyy', 'en-US') == this.selectedDate) : data
        this.todoService.fixLists()
      },
      (error) => console.error('Yapılacaklar listesi alınamadı:', error)
    );
  }
}
