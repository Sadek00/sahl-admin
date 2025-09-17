import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernLoginComponent } from './modern-login.component';

describe('ModernLoginComponent', () => {
  let component: ModernLoginComponent;
  let fixture: ComponentFixture<ModernLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModernLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModernLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
