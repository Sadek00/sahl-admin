import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.currentUserValue) {
    return true;
  }

  // Redirect to login page
  return router.parseUrl('/authentication/login');
};