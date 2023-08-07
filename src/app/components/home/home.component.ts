import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

  <app-header></app-header>

  <app-todoes></app-todoes>
 
  <app-footer></app-footer>
  
  `
})
export class HomeComponent{
}
