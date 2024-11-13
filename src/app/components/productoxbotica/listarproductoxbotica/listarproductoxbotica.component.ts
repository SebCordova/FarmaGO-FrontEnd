import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-listarproductoxbotica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatCardModule,CommonModule,MatPaginatorModule,MatPaginator],
  templateUrl: './listarproductoxbotica.component.html',
  styleUrl: './listarproductoxbotica.component.css'
})
export class ListarproductoxboticaComponent {

  
  constructor(private pxbS:ProductoxboticaService){}

  datapxb = new MatTableDataSource<any>(); 

    // Datos para la paginación
    totalCards: number=this.datapxb.data.length; // Número total de productos
    currentPageData: any[] = []; // Productos actuales a mostrar en la página
    pageSize: number = 5; // Número de tarjetas por página
    currentPage: number = 0; // Página actual

  ngOnInit(): void {

   

    this.pxbS.list().subscribe((data) => {
      this.datapxb.data = data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica);
      this.totalCards=this.datapxb.data.length; // Número total de productos
      this.updatePageData();
    });

    // O si necesitas traer la segunda lista también
    this.pxbS.getList().subscribe((data) => {
      this.datapxb.data = data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica);
      this.totalCards=this.datapxb.data.length; // Número total de productos
      this.updatePageData();
    });
    
        ////----------------------Paginación------------------//


    

    
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
      this.currentPageData = this.datapxb.data.slice(startIndex, startIndex + this.pageSize); // Filtrar productos según la página actual
    }

  

  eliminar(id: number) {
    this.pxbS.delete(id).subscribe((data) => {
      this.pxbS.list().subscribe((data) => {
        this.pxbS.setList(data);
      });
    });
  }
}

