import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthManageComponent } from './user-auth-manage.component';

describe('UserAuthManageComponent', () => {
  let component: UserAuthManageComponent;
  let fixture: ComponentFixture<UserAuthManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAuthManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAuthManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
