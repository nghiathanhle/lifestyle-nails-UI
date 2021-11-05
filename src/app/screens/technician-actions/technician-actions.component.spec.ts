import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianActionsComponent } from './technician-actions.component';

describe('TechnicianActionsComponent', () => {
  let component: TechnicianActionsComponent;
  let fixture: ComponentFixture<TechnicianActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
