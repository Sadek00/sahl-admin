import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';
import { Permission } from '../../core/models/user.model';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {
  private resource: string = '';
  private action: Permission = 'read';
  private initialized = false;

  @Input()
  set hasPermission(value: [string, Permission]) {
    if (value) {
      [this.resource, this.action] = value;
      if (this.initialized) {
        this.updateView();
      }
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.initialized = true;
    this.updateView();
  }

  private updateView() {
    if (this.permissionService.hasPermission(this.resource, this.action)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
