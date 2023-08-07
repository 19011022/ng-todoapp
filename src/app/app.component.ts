import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent{
  title = 'ToDoClient';
  // isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService){}
}
