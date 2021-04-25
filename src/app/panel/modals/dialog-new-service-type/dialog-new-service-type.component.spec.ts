import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewServiceTypeComponent } from './dialog-new-service-type.component';

describe('DialogNewServiceTypeComponent', () => {
  let component: DialogNewServiceTypeComponent;
  let fixture: ComponentFixture<DialogNewServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewServiceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
