import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPinDialogComponent } from './person-pin-dialog.component';

describe('PersonPinDialogComponent', () => {
  let component: PersonPinDialogComponent;
  let fixture: ComponentFixture<PersonPinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
