import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationDetailsUpdateComponent } from './simulation-details-update.component';

describe('SimulationDetailsUpdateComponent', () => {
  let component: SimulationDetailsUpdateComponent;
  let fixture: ComponentFixture<SimulationDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationDetailsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
