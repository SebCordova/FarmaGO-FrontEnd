import { Component } from '@angular/core';
import { DetalleordenService } from '../../../services/detalleorden.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listardetalleorden',
  standalone: true,
  imports: [MatIconModule, RouterModule,MatCardModule,CommonModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listardetalleorden.component.html',
  styleUrl: './listardetalleorden.component.css'
})
export class ListardetalleordenComponent {

  dataDO= new MatTableDataSource<any>();
  
      // Datos para la paginación
      totalCards: number=this.dataDO.data.length; // Número total de productos
      currentPageData: any[] = []; // Productos actuales a mostrar en la página
      pageSize: number = 5; // Número de tarjetas por página
      currentPage: number = 0; // Página actual
      

  constructor(private doS:DetalleordenService){
   }

  ngOnInit(): void {


    this.doS.list().subscribe((data) => {
      console.log(data);
      this.dataDO.data = data.sort((a, b) => a.idDetalleOrden - b.idDetalleOrden);
      this.totalCards=this.dataDO.data.length; // Número total de productos
      this.updatePageData();
    });

     
    // O si necesitas traer la segunda lista también
    this.doS.getList().subscribe((data) => {
      this.dataDO.data = data.sort((a, b) => a.idDetalleOrden - b.idDetalleOrden);
      this.totalCards=this.dataDO.data.length; // Número total de productos
      this.updatePageData();

    });
    

    

  }

////----------------------Paginación------------------//
      // Función para manejar el cambio de página
      onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex; // Actualizar la página actual
        this.pageSize = event.pageSize; // Obtener el tamaño de página
        this.updatePageData(); // Actualizar los productos a mostrar
      }
      // Función para actualizar los productos mostrados según la página
      updatePageData() {
        const startIndex = this.currentPage * this.pageSize; // Índice inicial
        //reemplazar el current page data por el dataDO.data en html
        this.currentPageData = this.dataDO.data.slice(startIndex, startIndex + this.pageSize); // Filtrar productos según la página actual
      }

  eliminar(id: number) {
    this.doS.delete(id).subscribe((data) => {
      this.doS.list().subscribe((data) => {
        this.doS.setList(data);
      });
    });
  }
  
}
