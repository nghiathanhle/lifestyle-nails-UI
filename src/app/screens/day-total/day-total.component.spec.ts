import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTotalComponent } from './day-total.component';

describe('DayTotalComponent', () => {
  let component: DayTotalComponent;
  let fixture: ComponentFixture<DayTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
