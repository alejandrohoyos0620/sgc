import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinishedComponent } from './dialog-finished.component';

describe('DialogFinishedComponent', () => {
  let component: DialogFinishedComponent;
  let fixture: ComponentFixture<DialogFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
