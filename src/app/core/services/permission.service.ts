import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Permission, UserPermission } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private authService: AuthService) {}

  /**
   * Check if user has permission for a specific action on a resource
   */
  hasPermission(resource: string, action: Permission): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;

    // Admin role has all permissions
    if (user.roles.includes('admin')) return true;

    const resourcePermissions = user.permissions.find(p => p.resource === resource);
    return resourcePermissions?.actions.includes(action) || false;
  }

  /**
   * Check if user has all specified permissions
   */
  hasPermissions(permissions: { resource: string; action: Permission }[]): boolean {
    return permissions.every(p => this.hasPermission(p.resource, p.action));
  }

  /**
   * Check if user has any of the specified permissions
   */
  hasAnyPermission(permissions: { resource: string; action: Permission }[]): boolean {
    return permissions.some(p => this.hasPermission(p.resource, p.action));
  }

  /**
   * Get all permissions for a specific resource
   */
  getResourcePermissions(resource: string): Permission[] {
    const user = this.authService.currentUserValue;
    if (!user) return [];
    
    const resourcePermissions = user.permissions.find(p => p.resource === resource);
    return resourcePermissions?.actions || [];
  }
}
