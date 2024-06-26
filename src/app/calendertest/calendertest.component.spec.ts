import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendertestComponent } from './calendertest.component';

describe('CalendertestComponent', () => {
  let component: CalendertestComponent;
  let fixture: ComponentFixture<CalendertestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendertestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
