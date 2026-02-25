import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from "angular-tabler-icons";
import { ThemeService } from 'src/app/core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, TablerIconsModule, CommonModule],
  templateUrl: './modern-login.component.html',
  styleUrl: './modern-login.component.scss'
})
export class ModernLoginComponent {
  constructor( 
    private themeService: ThemeService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

}
