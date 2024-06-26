import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailCalComponent } from './task-detail-cal.component';

describe('TaskDetailCalComponent', () => {
  let component: TaskDetailCalComponent;
  let fixture: ComponentFixture<TaskDetailCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailCalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
