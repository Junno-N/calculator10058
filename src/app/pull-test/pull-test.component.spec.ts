import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullTESTComponent } from './pull-test.component';

describe('PullTESTComponent', () => {
  let component: PullTESTComponent;
  let fixture: ComponentFixture<PullTESTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PullTESTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PullTESTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
