import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewDeviceComponent } from './dialog-new-device.component';

describe('DialogNewDeviceComponent', () => {
  let component: DialogNewDeviceComponent;
  let fixture: ComponentFixture<DialogNewDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
