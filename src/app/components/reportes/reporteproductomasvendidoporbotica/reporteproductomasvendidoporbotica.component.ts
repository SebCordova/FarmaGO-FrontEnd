import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DetalleordenService } from '../../../services/detalleorden.service';
import { Botica } from '../../../models/Botica';

@Component({
  selector: 'app-reporteproductomasvendidoporbotica',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteproductomasvendidoporbotica.component.html',
  styleUrl: './reporteproductomasvendidoporbotica.component.css'
})
export class ReporteproductomasvendidoporboticaComponent {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
 
  constructor(private doS: DetalleordenService) {}

  ngOnInit(): void {
    this.doS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => `${item.nombreB}(${item.nombreP})`);
     console.log(data);
     console.log(this.barChartLabels);
  
      this.barChartData = [
        {
          data: data.map((item) => item.productoVendido),
        
          backgroundColor: [
           /* '#280303',
            '#560808',
            '#8f0d0d',
            '#d02424',
            '#de4949',
*/
            '#280303',
            '#560808',
            '#8f0d0d',
            '#d02424',
            '#de4949',
            '#ff6384',
            '#36a2eb',
            '#cc65fe',
            '#ffce56',
            '#4bc0c0',
          ],
          borderColor: 'rgb(0,0,0)',
          borderWidth: 1,
        },
      ];
    });
  }
}
