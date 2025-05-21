export type UserRole = 'admin' | 'user' | 'manager' | string;

export type Permission = 'create' | 'read' | 'update' | 'delete' | string;

export interface UserPermission {
  resource: string;  // e.g., 'users', 'products', etc.
  actions: Permission[];  // e.g., ['create', 'read', 'update']
}

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
  refreshToken?: string;
  tokenExpiration?: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  roles: UserRole[];
  permissions: UserPermission[];
}