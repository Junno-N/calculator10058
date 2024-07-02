import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTaskComponent } from './past-task.component';

describe('PastTaskComponent', () => {
  let component: PastTaskComponent;
  let fixture: ComponentFixture<PastTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
