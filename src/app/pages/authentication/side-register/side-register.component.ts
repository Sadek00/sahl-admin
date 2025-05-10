import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-side-register',
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  error = '';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(
      this.f.username.value!,
      this.f.email.value!,
      this.f.password.value!
    )
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate(['/authentication/login']);
      },
      error: error => {
        this.error = error.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
