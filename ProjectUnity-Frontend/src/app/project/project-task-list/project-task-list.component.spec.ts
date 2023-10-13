import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskListComponent } from './project-task-list.component';

describe('ProjectTaskListComponent', () => {
  let component: ProjectTaskListComponent;
  let fixture: ComponentFixture<ProjectTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTaskListComponent]
    });
    fixture = TestBed.createComponent(ProjectTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
