import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { SimulationDetailsComponent } from './simulation-details/simulation-details.component';
import { SimulationDetailsUpdateComponent } from './simulation-details-update/simulation-details-update.component';
import { ChartComponent } from './chart/chart.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SimulationListComponent,
    SimulationDetailsComponent,
    SimulationDetailsUpdateComponent,
    ChartComponent,
    LeftBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: SimulationListComponent},
      {path: 'simulations/:simulationId', component: SimulationDetailsComponent},
      {path: 'update/:simulationId', component: SimulationDetailsUpdateComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
