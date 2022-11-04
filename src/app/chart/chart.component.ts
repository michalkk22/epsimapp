import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { Day } from '../day';
import { DayService } from '../day.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public days!: Day[];
  public len!: number;
  public myArray: number[][] = [];
  public jdArray: number[][] = [[1,2,3,4,5],[2,3,4,5,6]];

  constructor(
    private route: ActivatedRoute,
    private dayService: DayService
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const simulationIdFromRoute = Number(routeParams.get('simulationId'));
    this.getDays(simulationIdFromRoute);

  }

  public initChart(): void {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('chart-box')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: this.myArray
      },
      xAxis: {
        name: 'day',
        nameLocation: 'end',
        type: 'category',
      },
      yAxis: {},
      series: [
        {
          name: 'Pi',
          type: 'line',
          smooth: true
        },
        {
          name: 'Pv',
          type: 'line',
          smooth: true
        },
        {
          name: 'Pm',
          type: 'line',
          smooth: true
        },
        {
          name: 'Pr',
          type: 'line',
          smooth: true
        }
      ]
    };
    
    option && myChart.setOption(option);
  }


  public getDays(simulationId: number): void {
    this.dayService.getDaysBySimulationId(simulationId).subscribe(
      (response: Day[]) => {
        this.days = response;

        this.days.forEach(day => {
          this.myArray.push([day.numberOfDay,day.pi,day.pv,day.pm,day.pr]);
        });

        this.initChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
