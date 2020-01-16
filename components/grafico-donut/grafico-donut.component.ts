import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styles: []
})
export class GraficoDonutComponent implements OnInit {
 @Input('labels') public doughnutChartLabels: Label[] = [];
 @Input('data') public doughnutChartData: MultiDataSet = [];
  @Input('type') public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
