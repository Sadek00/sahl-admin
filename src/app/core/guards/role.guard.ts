import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private authService: AuthService, 
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/authentication/login']);
      return false;
    }

    const { roles, permissions } = route.data;

    // Check roles if specified
    if (roles?.length > 0 && !this.authService.hasAnyRole(roles)) {
      this.router.navigate(['/']);
      return false;
    }

    // Check permissions if specified
    if (permissions?.length > 0 && !this.permissionService.hasPermissions(permissions)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
