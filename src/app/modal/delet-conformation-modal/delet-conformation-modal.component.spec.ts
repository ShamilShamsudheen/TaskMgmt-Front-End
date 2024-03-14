import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletConformationModalComponent } from './delet-conformation-modal.component';

describe('DeletConformationModalComponent', () => {
  let component: DeletConformationModalComponent;
  let fixture: ComponentFixture<DeletConformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletConformationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletConformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
