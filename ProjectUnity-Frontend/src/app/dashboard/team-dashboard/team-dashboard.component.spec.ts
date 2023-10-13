import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDashboardComponent } from './team-dashboard.component';

describe('TeamDashboardComponent', () => {
  let component: TeamDashboardComponent;
  let fixture: ComponentFixture<TeamDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDashboardComponent]
    });
    fixture = TestBed.createComponent(TeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
