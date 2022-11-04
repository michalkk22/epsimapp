import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SimulationService } from './../simulation.service';
import { Simulation } from './../simulation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation-details-update',
  templateUrl: './simulation-details-update.component.html',
  styleUrls: ['./simulation-details-update.component.css']
})
export class SimulationDetailsUpdateComponent implements OnInit {
  public updateSimulation!: Simulation;

  constructor(
    private simulationService: SimulationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const simulationIdFromRoute = Number(routeParams.get('simulationId'));
    this.getSimulation(simulationIdFromRoute);
  }

  public getSimulation(id: number): void {
    this.simulationService.getSimulationById(id).subscribe(
      (response: Simulation) => {
        this.updateSimulation = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateSimulation(simulation: Simulation): void {
    this.simulationService.updateSimulation(simulation).subscribe(
      (response: Simulation) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
      document.getElementById('update-simulation-form')?.click();
  }


}
