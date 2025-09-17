import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card class="cardWithShadow">
      <mat-card-header>
        <mat-card-title>Demo Feature Component</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>This is a standalone feature component.</p>
      </mat-card-content>
    </mat-card>
    <p>Use this component to demonstrate the functionality of your application.</p>
  `,
  styles: [`
    
  `]
})
export class DemoComponent {
  constructor() { }
}
