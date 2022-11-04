import { Day } from './../day';
import { HttpErrorResponse } from '@angular/common/http';
import { SimulationService } from './../simulation.service';
import { Simulation } from './../simulation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayService } from '../day.service';

@Component({
  selector: 'app-simulation-details',
  templateUrl: './simulation-details.component.html',
  styleUrls: ['./simulation-details.component.css']
})
export class SimulationDetailsComponent implements OnInit {
  public simulation!: Simulation;
  public days!: Day[];
  public filteredDays!: Day[];

  constructor(
    private simulationService: SimulationService,
    private dayService: DayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const simulationIdFromRoute = Number(routeParams.get('simulationId'));
    this.getSimulation(simulationIdFromRoute);
    this.getDays(simulationIdFromRoute);
  }

  public getSimulation(id: number): void {
    this.simulationService.getSimulationById(id).subscribe(
      (response: Simulation) => {
        this.simulation = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDays(simulationId: number): void {
    this.dayService.getDaysBySimulationId(simulationId).subscribe(
      (response: Day[]) => {
        this.days = response;
        this.filteredDays = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public filterDaysByNumberOfDay(begin: number, end: number): void {
    if (begin === null)
      begin=1;
    if (end === null)
      end=this.days.length;
    const results: Day[] = [];
    for (let i = begin-1; i < end; i++) {
      if (!this.days[i])
        break;
      results.push(this.days[i]);
    }

    if (results.length === 0)
      this.filteredDays=this.days;
    else
      this.filteredDays=results;
  }
}
