import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreListManageComponent } from './genre-list-manage.component';

describe('GenreListManageComponent', () => {
  let component: GenreListManageComponent;
  let fixture: ComponentFixture<GenreListManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreListManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreListManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
