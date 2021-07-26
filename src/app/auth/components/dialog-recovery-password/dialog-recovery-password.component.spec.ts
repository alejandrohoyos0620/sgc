import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecoveryPasswordComponent } from './dialog-recovery-password.component';

describe('DialogRecoveryPasswordComponent', () => {
  let component: DialogRecoveryPasswordComponent;
  let fixture: ComponentFixture<DialogRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecoveryPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
