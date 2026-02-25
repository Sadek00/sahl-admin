import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ThemeService } from 'src/app/core/services/theme.service';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, TablerIconsModule],
  templateUrl: './side-register.component.html',
  styleUrl: '../side-login/side-login.component.scss'
})
export class AppSideRegisterComponent {
  hidePassword = true;
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private themeService: ThemeService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }


  backgroundImage(): string {
    return this.isDarkTheme() 
      ? '/assets/images/backgrounds/boy-with-key-dark.png'
      : '/assets/images/backgrounds/boy-with-key.png';
  }
}
