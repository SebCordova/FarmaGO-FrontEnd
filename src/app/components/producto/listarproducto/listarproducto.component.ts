import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listarproducto',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatCardModule,CommonModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent {


  
  datas= new MatTableDataSource<any>();

        // Datos para la paginación
        totalCards: number=this.datas.data.length; // Número total de productos
        currentPageData: any[] = []; // Productos actuales a mostrar en la página
        pageSize: number = 5; // Número de tarjetas por página
        currentPage: number = 0; // Página actual
        

  constructor(private pS:ProductoService){}

  ngOnInit(): void {


    this.pS.list().subscribe((data) => {
      this.datas.data = data.sort((a, b) => a.idProducto - b.idProducto);
      this.totalCards=this.datas.data.length; // Número total de productos
      this.updatePageData();
    });

    // O si necesitas traer la segunda lista también
    this.pS.getList().subscribe((data) => {
      this.datas.data = data.sort((a, b) => a.idProducto - b.idProducto);
      this.totalCards=this.datas.data.length; // Número total de productos
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
        this.currentPageData = this.datas.data.slice(startIndex, startIndex + this.pageSize); // Filtrar productos según la página actual
      }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }


}
