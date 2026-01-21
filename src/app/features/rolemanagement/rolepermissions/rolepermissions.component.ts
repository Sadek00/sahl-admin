import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RolePermission } from '../../models/role-permission.model';
import {
  HeaderAction,
  HeaderComponent,
} from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-rolepermissions',
  imports: [MaterialModule, HeaderComponent],
  templateUrl: './rolepermissions.component.html',
  styleUrl: './rolepermissions.component.scss',
})
export class RolepermissionsComponent {
  isExpanded = signal(true);

  permissions = signal<RolePermission[]>([
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      selected: false,
    },
    {
      key: 'ecommerce',
      label: 'Ecommerce',
      icon: 'inventory_2',
      selected: false,
    },
    { key: 'hrms', label: 'HRMS', icon: 'receipt_long', selected: false },
    { key: 'customers', label: 'Customers', icon: 'people', selected: false },
    { key: 'reports', label: 'Reports', icon: 'analytics', selected: false },
    { key: 'settings', label: 'Settings', icon: 'settings', selected: false },
  ]);

  // Computed signals
  selectedCount = computed(
    () => this.permissions().filter((p) => p.selected).length,
  );

  allSelected = computed(() => this.permissions().every((p) => p.selected));

  someSelected = computed(() => this.permissions().some((p) => p.selected));

  progressValue = computed(
    () => (this.selectedCount() / this.permissions().length) * 100,
  );

  toggleExpanded(): void {
    this.isExpanded.update((expanded) => !expanded);
  }

  toggleSelectAll(): void {
    const shouldSelectAll = !this.allSelected();
    this.permissions.update((permissions) =>
      permissions.map((p) => ({ ...p, selected: shouldSelectAll })),
    );
  }

  togglePermission(key: string): void {
    this.permissions.update((permissions) =>
      permissions.map((p) =>
        p.key === key ? { ...p, selected: !p.selected } : p,
      ),
    );
  }

  savePermissions(): void {
    const selectedPermissions = this.permissions().filter((p) => p.selected);
    console.log(
      'Saving permissions:',
      selectedPermissions.map((p) => p.key),
    );
    // Implement your save logic here
  }

  resetPermissions(): void {
    this.permissions.update((permissions) =>
      permissions.map((p) => ({ ...p, selected: false })),
    );
  }

  headerActions: HeaderAction[] = [
    {
      label: 'Add Permission',
      icon: 'add',
      color: 'primary',
      variant: 'flat',
      action: () => this.add(),
    },
  ];

  add(): void {
    console.log('Add action triggered');
    // Implement your add logic here
  }
}
