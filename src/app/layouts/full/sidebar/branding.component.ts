import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <div class="branding">
      <a href="/" class="logodark d-flex align-items-center">
        <img
          src="./assets/images/logos/logoSahl.png"
          class="align-middle m-2"
          alt="logo"
        />
        <span>Sahl Admin</span>
      </a>
    </div>
  `,
  styleUrls: ['./branding.component.scss'],
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
