import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoadingSpinnerComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Sahl Admin';
}
