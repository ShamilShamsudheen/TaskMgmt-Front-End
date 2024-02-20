import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnautorizedErrorComponent } from './unautorized-error.component';

describe('UnautorizedErrorComponent', () => {
  let component: UnautorizedErrorComponent;
  let fixture: ComponentFixture<UnautorizedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnautorizedErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnautorizedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
