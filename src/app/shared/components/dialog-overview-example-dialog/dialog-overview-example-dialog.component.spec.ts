import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog.component';

describe('DialogOverviewExampleDialogComponent', () => {
  let component: DialogOverviewExampleDialog;
  let fixture: ComponentFixture<DialogOverviewExampleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOverviewExampleDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewExampleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
