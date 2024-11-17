import { Component } from '@angular/core';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { LoginService } from '../../../services/login.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BoticaService } from '../../../services/botica.service';
import { Botica } from '../../../models/Botica';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reportevencidos',
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
  templateUrl: './reportevencidos.component.html',
  styleUrl: './reportevencidos.component.css',
})
export class ReportevencidosComponent {
  constructor(
    private pxbS: ProductoxboticaService,
    private bS: BoticaService,
    private loginService: LoginService
  ) {}

  datapxb = new MatTableDataSource<any>();
  role: string = '';
  email: string = '';
  productos: ProductoxBotica[] = [];
  listaBoticas: Botica[] = [];
  idBotica: number = 0;

  // Datos para la paginación
  totalCards: number = this.datapxb.data.length; // Número total de productos
  currentPageData: any[] = []; // Productos actuales a mostrar en la página
  pageSize: number = 5; // Número de tarjetas por página
  currentPage: number = 0; // Página actual

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    if (this.role === 'Administrador') {
      this.bS.list().subscribe((data) => {
        this.listaBoticas = data;

        const obs = this.listaBoticas.map((botica: Botica) =>
          this.pxbS.getVencidos(botica.idBotica)
        );

        forkJoin(obs).subscribe(
          (result) =>
            {this.datapxb.data = result
              .flat()
              .sort((a, b) => a.idProductoxBotica - b.idProductoxBotica)
              this.totalCards = this.datapxb.data.length; // Número total de productos
              this.updatePageData();
            }
        );

      });
    }
    if (this.role === 'DBotica') {
      this.bS.list().subscribe((data) => {
        const filtro = data.filter(b => b.usuario.correoUsuario == this.email)
        this.listaBoticas = filtro;

        const obs = this.listaBoticas.map((botica: Botica) =>
          this.pxbS.getVencidos(botica.idBotica)
        );

        forkJoin(obs).subscribe(
          (result) =>
            {this.datapxb.data = result
              .flat()
              .sort((a, b) => a.idProductoxBotica - b.idProductoxBotica)
              this.totalCards = this.datapxb.data.length; // Número total de productos
              this.updatePageData();
            }
        );

      });
    }
  }

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
}
