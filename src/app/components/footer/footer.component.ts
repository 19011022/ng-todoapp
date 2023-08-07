import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="d-flex">

  <div class="container w-25">
    <h2 class="text-underline" style="height: .7rem;">Priorities</h2>
    <div class="d-flex">
      <div class="rounded-circle bg-info mx-1" style="height: 1rem; width:1rem"></div>Low
    </div>
    <div class="d-flex">
      <div class="rounded-circle bg-warning mx-1" style="height: 1rem; width:1rem"></div>Medium
    </div> 
    <div class="d-flex">
      <div class="rounded-circle bg-danger mx-1" style="height: 1rem; width:1rem"></div>High
    </div>
    </div>

    <div class="w-75">
      </div>
      
      <app-add-todo></app-add-todo>
    
  </div>
  `,
})
export class FooterComponent {

}
