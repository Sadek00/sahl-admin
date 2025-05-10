import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = false;
  @Input() toggleChecked = true;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }
}