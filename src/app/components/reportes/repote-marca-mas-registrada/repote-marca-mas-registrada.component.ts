import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';
import { ProductoService } from '../../../services/producto.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-repote-marca-mas-registrada',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './repote-marca-mas-registrada.component.html',
  styleUrl: './repote-marca-mas-registrada.component.css'
})
export class RepoteMarcaMasRegistradaComponent implements OnInit{
  barChartOptions:ChartOptions = {
    responsive:true
  }
  barChartLabels:string[] = []
  barChartType:ChartType='pie'
  barChartLegend = true
  barChartData: ChartDataset[]=[]
  constructor(private pS:ProductoService){}
  ngOnInit(): void {
    this.pS.getMarcaMasRegistrada().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.marcaProducto)
      this.barChartData=[{
        data:data.map(item=>item.totalRegistros),
        label:'Marca más registrada',
        backgroundColor:['#2430e8', '#575fd4', '#373da0', '#95b5ea'],
        borderColor:'#0d3475',
        borderWidth:1
      }]
    })
  }
}
