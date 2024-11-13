import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BoticaService } from '../../../services/botica.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reportedistrito',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportedistrito.component.html',
  styleUrl: './reportedistrito.component.css',
})
export class ReportedistritoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private bs: BoticaService) {}

  ngOnInit(): void {
    this.bs.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.distrito);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Cantidad de boticas por distrito',
          backgroundColor: [
            '#280303',
            '#560808',
            '#8f0d0d',
            '#d02424',
            '#de4949',
          ],
          borderColor: 'rgb(0,0,0)',
          borderWidth: 1,
        },
      ];
    });
  }
}
