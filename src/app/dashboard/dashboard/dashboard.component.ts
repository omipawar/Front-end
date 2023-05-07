import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';
declare var Plotly: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chart: any;
  lable: string[] = [];
  width: number[] = [];
  y1Value: number[] = [];
  y2Value: number[] = [];

  data: any;
  config: any;
  datas: any;
  counts: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getdashboardCounts();
    this.getGraphData();
  }

  getdashboardCounts() {
    this.dashboardService.dashboardCounts().subscribe((res: any) => {
      // console.log(res.counts[0]);
      this.counts = res.counts[0];
    })
  }

  getGraphData() {
    this.dashboardService.graphCounts().subscribe((res: any) => {
      // console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        let lable = res.data[i]._id.slice(0,5)
        this.lable.push(lable+".");
        this.y1Value.push(res.data[i].registered);
        this.y2Value.push(res.data[i].closed);
      }
      let trace1 = {
        x: this.lable,
        y: this.y1Value,
        width: this.width,
        name: 'Total',
        type: 'bar',
        text: this.y1Value.map(String),
        textposition: 'auto',
        marker: {
          color: 'rgb(4, 80, 149)'
        }
      };

      let trace2 = {
        x: this.lable,
        y: this.y2Value,
        width: this.width,
        name: 'Closed',
        text: this.y2Value.map(String),
        textposition: 'auto',
        type: 'bar',
        marker: {
          color: "#61a251"
        }
      };

      this.data = [trace1, trace2];
      let layout = { barmode: 'group' };
      Plotly.newPlot('myDiv', this.data, layout);
    })
  }
}
