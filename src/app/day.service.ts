import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Day } from './day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDaysBySimulationId(simulationId: number): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.apiServerUrl}/day/find/${simulationId}`);
  } 
}
