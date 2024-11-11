import { Component } from '@angular/core';
import { DetalleordenService } from '../../../services/detalleorden.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listardetalleorden',
  standalone: true,
  imports: [MatIconModule, RouterModule,MatCardModule,CommonModule],
  templateUrl: './listardetalleorden.component.html',
  styleUrl: './listardetalleorden.component.css'
})
export class ListardetalleordenComponent {

  dataDO= new MatTableDataSource<any>();
  

  constructor(private doS:DetalleordenService){}

  ngOnInit(): void {


    this.doS.list().subscribe((data) => {
      console.log(data);
      this.dataDO.data = data.sort((a, b) => a.idDetalleOrden - b.idDetalleOrden);
    });

     
    // O si necesitas traer la segunda lista también
    this.doS.getList().subscribe((data) => {
      this.dataDO.data = data.sort((a, b) => a.idDetalleOrden - b.idDetalleOrden);
    });
    
  }

  eliminar(id: number) {
    this.doS.delete(id).subscribe((data) => {
      this.doS.list().subscribe((data) => {
        this.doS.setList(data);
      });
    });
  }
  
}
