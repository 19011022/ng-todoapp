import { Component, OnInit, ViewChild } from '@angular/core';
import { DateSelectorComponent } from '../date-selector/date-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  template: `
  <div class="container-fluid row d-flex text-center shadow bg-white p-1 mb-3 fixed-height-header-container">
    <div class="col-sm">
      <button mat-icon-button color="warn" (click)="authService.logout()">
        <mat-icon>logout</mat-icon>
      </button>
        Hi, {{user}}!
    </div>
      <app-date-selector [dateMode]="dateMode" class="col-sm" ></app-date-selector>

    <mat-slide-toggle [(ngModel)]="dateMode" class="col-sm mb-2">Date Mode</mat-slide-toggle>
  </div>
  `,
  standalone: true,
  imports: [DateSelectorComponent, MatIconModule, MatSlideToggleModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class HeaderComponent {
  user: string;
  dateMode: boolean = false;

  constructor(public authService: AuthService, private rotuer: Router) { }

  ngOnInit(): void {
    this.user = this.authService.checkToken()
  }
}
