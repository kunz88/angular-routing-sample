import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  private destroyRef = inject(DestroyRef);
  private routerService = inject(Router);

  loginError = signal(false);
  authForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    return (
      this.authForm.controls.email.touched &&
      this.authForm.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.authForm.controls.password.touched &&
      this.authForm.controls.password.invalid
    );
  }

  ngOnInit() {
    const savedLogin = window.localStorage.getItem('saved-login-form');

    if (savedLogin) {
      const { email }: { email: string } = JSON.parse(savedLogin);

      if (typeof email === 'string') {
        this.authForm.patchValue({ email }); // permette di settare un valore del formGroup
      }
    }

    const subscription = this.authForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
          this.loginError.set(false);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    this.authForm.markAllAsTouched();

    if (!this.authForm.valid) {
      return;
    }

    if (
      this.authForm.valid &&
      this.authForm.get('email')?.value === 'stefano@steve.com' &&
      this.authForm.get('password')?.value === '12345678'
    ) {
      window.localStorage.setItem(
        'saved-login-form',
        JSON.stringify({ email: this.authForm.get('email')?.value })
      );
      this.loginError.set(false);

      this.routerService.navigate(['items']);
    }

    this.loginError.set(true);
    console.log(this.authForm.value);
  }
}
