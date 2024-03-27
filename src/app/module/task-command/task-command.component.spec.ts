import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommandComponent } from './task-command.component';

describe('TaskCommandComponent', () => {
  let component: TaskCommandComponent;
  let fixture: ComponentFixture<TaskCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
