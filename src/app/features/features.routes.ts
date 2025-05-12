import { Routes } from '@angular/router';

export const FEATURES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'demo',
        loadComponent: () => import('./demo/demo.component').then(m => m.DemoComponent)
      }
    ]
  }
];
