import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation } from './simulation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }
  
  public getSimulations(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(`${this.apiServerUrl}/simulation/all`);
  }

  public getSimulationById(simulationId: number): Observable<Simulation> {
    return this.http.get<Simulation>(`${this.apiServerUrl}/simulation/find/${simulationId}`);
  }

  public addSimulation(simulation: Simulation): Observable<Simulation> {
    return this.http.post<Simulation>(`${this.apiServerUrl}/simulation/add`, simulation);
  }

  public updateSimulation(simulation: Simulation): Observable<Simulation> {
    return this.http.put<Simulation>(`${this.apiServerUrl}/simulation/update`, simulation);
  }

  public deleteSimulation(simulationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/simulation/delete/${simulationId}`);
  }
}
