import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatComponent } from './flat.component';

describe('FlatComponent', () => {
  let component: FlatComponent;
  let fixture: ComponentFixture<FlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
