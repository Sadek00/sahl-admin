import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
export interface Breadcrumb {
  label: string;
  url?: string;
  active?: boolean;
}

export interface HeaderAction {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  variant?: 'flat' | 'stroked' | 'raised';
  action: () => void;
}

export interface MenuAction {
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
}

@Component({
  selector: 'page-header',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() icon: string = '';
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() menuActions: MenuAction[] = [];
  @Input() headerActions: HeaderAction[] = [];
  @Input() sticky: boolean = true;
  @Input() customActionsTemplate?: TemplateRef<unknown>;

  // Outputs
  @Output() breadcrumbClick = new EventEmitter<Breadcrumb>();

  onBreadcrumbClick(breadcrumb: Breadcrumb, event: Event): void {
    if (!breadcrumb.active && breadcrumb.url) {
      event.preventDefault();
      this.breadcrumbClick.emit(breadcrumb);
    }
  }
}
