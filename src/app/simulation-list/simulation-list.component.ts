import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Simulation } from '../simulation';
import { SimulationService } from '../simulation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.css']
})
export class SimulationListComponent implements OnInit {

  public simulations!: Simulation[];
  public deleteSimulation!: Simulation;

  constructor(private simulationService: SimulationService) {}

  ngOnInit() {
      this.getSimulations();
  }

  public getSimulations(): void {
    this.simulationService.getSimulations().subscribe(
      (response: Simulation[]) => {
        this.simulations = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSimulation(addForm: NgForm): void {
    document.getElementById('add-simulation-form')?.click();
    this.simulationService.addSimulation(addForm.value).subscribe(
      (response: Simulation) => {
        console.log(response);
        this.getSimulations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSimulation(simulationId: number): void {
    document.getElementById('update-simulation-form')?.click();
    this.simulationService.deleteSimulation(simulationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSimulations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(simulation: Simulation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === "add"){
      button.setAttribute('data-target', '#addSimulationModal');
    }
    if (mode === "delete"){
      this.deleteSimulation = simulation;
      button.setAttribute('data-target', '#deleteSimulationModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
