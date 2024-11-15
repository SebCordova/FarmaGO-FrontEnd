import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatCardModule,CommonModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  dataDO= new MatTableDataSource<any>();
  role: string = '';
  email: string = '';

        // Datos para la paginación
        totalCards: number=this.dataDO.data.length; // Número total de productos
        currentPageData: any[] = []; // Productos actuales a mostrar en la página
        pageSize: number = 5; // Número de tarjetas por página
        currentPage: number = 0; // Página actual

  constructor(private cS: ComentarioService, private loginService:LoginService) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.cS.list().subscribe((data) => {
      if (this.role === 'Administrador'){
        console.log(data);
        this.dataDO.data = data.sort((a, b) => a.idComentario - b.idComentario);
        this.totalCards=this.dataDO.data.length; // Número total de productos
        this.updatePageData();
      }
      if (this.role === 'DBotica'){
        const filtro = data.filter(c => c.pxBotica.botica.usuario.correoUsuario == this.email)
        console.log(filtro);
        this.dataDO.data = filtro.sort((a, b) => a.idComentario - b.idComentario);
        this.totalCards=this.dataDO.data.length; // Número total de productos
        this.updatePageData();
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(c => c.usuario.correoUsuario == this.email)
        console.log(filtro);
        this.dataDO.data = filtro.sort((a, b) => a.idComentario - b.idComentario);
        this.totalCards=this.dataDO.data.length; // Número total de productos
        this.updatePageData();
      }
    });
    this.cS.getList().subscribe((data) => {
      if (this.role === 'Administrador'){
        console.log(data);
        this.dataDO.data = data.sort((a, b) => a.idComentario - b.idComentario);
        this.totalCards=this.dataDO.data.length; // Número total de productos
        this.updatePageData();
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(o => o.usuario.correoUsuario == this.email)
        console.log(filtro);
        this.dataDO.data = filtro.sort((a, b) => a.idComentario - b.idComentario);
        this.totalCards=this.dataDO.data.length; // Número total de productos
        this.updatePageData();
      }
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
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
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
}
