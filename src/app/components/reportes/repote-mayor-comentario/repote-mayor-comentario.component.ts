import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComentarioService } from '../../../services/comentario.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-repote-mayor-comentario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './repote-mayor-comentario.component.html',
  styleUrl: './repote-mayor-comentario.component.css'
})
export class RepoteMayorComentarioComponent implements OnInit{
  barChartOptions:ChartOptions = {
    responsive:true
  }
  barChartLabels:string[] = []
  barChartType:ChartType='bar'
  barChartLegend = true
  barChartData: ChartDataset[]=[]
  constructor(private cS:ComentarioService){}
  ngOnInit(): void {
    this.cS.getComentarioUsuario().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nomUsuario)
      this.barChartData=[{
        data:data.map(item=>item.totalComentarios),
        label:'Comentario con mas Usuarios',
        backgroundColor:['#2430e8', '#575fd4', '#373da0', '#95b5ea'],
        borderColor:'#0d3475',
        borderWidth:1
      }]
    })
  }
}
