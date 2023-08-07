import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  template: `

<div class="vh-100 d-flex justify-content-center align-items-center">
  <form [formGroup]="authForm" (ngSubmit)="submit()" class="card w-25 pt-3 text-center">
    <div>
      <mat-form-field class="w-75">
      <mat-label>Email</mat-label>
      <input matInput [formControl]="email" type="email">
      </mat-form-field>
    </div>

    <div>
      <mat-form-field class="w-75">
      <mat-label>Password</mat-label>
      <input matInput [formControl]="password" type="password">
      </mat-form-field>
    </div>

    <div class="my-2 pb-3">
      <button mat-raised-button color="primary" type="submit" class="mx-2 w-50">Register</button>
    </div>

    <a [routerLink]="['/login']" class="mb-3">Go to Login</a>
  </form>
</div>
  `
})
export class RegisterComponent {
  authForm: FormGroup;
  email = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  submit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.register(this.email.value, this.password.value).subscribe(() => {
      this.router.navigate(['/login'])
    }, ()=>{
        alert("Please enter valid email and password!")
    })
  }
}
