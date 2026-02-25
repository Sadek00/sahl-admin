import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: [],
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  private htmlElement!: HTMLHtmlElement;

  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private themeService: ThemeService
  ) {
    this.htmlElement = document.querySelector('html')!;
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }


}
