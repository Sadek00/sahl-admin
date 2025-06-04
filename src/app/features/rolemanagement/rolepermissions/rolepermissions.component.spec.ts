import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepermissionsComponent } from './rolepermissions.component';

describe('RolepermissionsComponent', () => {
  let component: RolepermissionsComponent;
  let fixture: ComponentFixture<RolepermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolepermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolepermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
