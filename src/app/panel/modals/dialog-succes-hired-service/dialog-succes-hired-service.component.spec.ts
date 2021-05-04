import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccesHiredServiceComponent } from './dialog-succes-hired-service.component';

describe('DialogSuccesHiredServiceComponent', () => {
  let component: DialogSuccesHiredServiceComponent;
  let fixture: ComponentFixture<DialogSuccesHiredServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuccesHiredServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccesHiredServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
