import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AppComponent } from '../../../app.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarproductoxbotica',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    CommonModule,
    MatPaginatorModule,
    MatPaginator,
  ],
  templateUrl: './listarproductoxbotica.component.html',
  styleUrl: './listarproductoxbotica.component.css',
})
export class ListarproductoxboticaComponent {
  constructor(
    private pxbS: ProductoxboticaService,
    private loginService: LoginService
  ) {}

  datapxb = new MatTableDataSource<any>();
  role: string = '';
  email: string = '';

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isDBotica() {
    return this.role === 'DBotica';
  }

  isCliente() {
    return this.role === 'Cliente';
  }

  isAdministrador() {
    return this.role === 'Administrador';
  }

  // Datos para la paginación
  totalCards: number = this.datapxb.data.length; // Número total de productos
  currentPageData: any[] = []; // Productos actuales a mostrar en la página
  pageSize: number = 5; // Número de tarjetas por página
  currentPage: number = 0; // Página actual

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.pxbS.list().subscribe((data) => {
      if (this.role === 'Administrador' || 'Cliente'){
        this.datapxb.data = data.sort(
          (a, b) => a.idProductoxBotica - b.idProductoxBotica
        );
        this.totalCards = this.datapxb.data.length; // Número total de productos
        this.updatePageData();
      }
      if (this.role == 'DBotica'){
        const filtro = data.filter(p => p.botica.usuario.correoUsuario == this.email)
        this.datapxb.data = filtro.sort(
          (a, b) => a.idProductoxBotica - b.idProductoxBotica
        );
        this.totalCards = this.datapxb.data.length; // Número total de productos
        this.updatePageData();
      }

    });

    // O si necesitas traer la segunda lista también
    this.pxbS.getList().subscribe((data) => {
      if (this.role === 'Administrador' || 'Cliente'){
        this.datapxb.data = data.sort(
          (a, b) => a.idProductoxBotica - b.idProductoxBotica
        );
        this.totalCards = this.datapxb.data.length; // Número total de productos
        this.updatePageData();
      }
      if (this.role == 'DBotica'){
        const filtro = data.filter(p => p.botica.usuario.correoUsuario == this.email)
        this.datapxb.data = filtro.sort(
          (a, b) => a.idProductoxBotica - b.idProductoxBotica
        );
        this.totalCards = this.datapxb.data.length; // Número total de productos
        this.updatePageData();
      }
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
    this.currentPageData = this.datapxb.data.slice(
      startIndex,
      startIndex + this.pageSize
    ); // Filtrar productos según la página actual
  }

  eliminar(id: number) {
    this.pxbS.delete(id).subscribe((data) => {
      this.pxbS.list().subscribe((data) => {
        this.pxbS.setList(data);
      });
    });
  }
}
