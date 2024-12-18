import { Component, OnInit, ViewChild } from '@angular/core';
import { BoticaService } from '../../../services/botica.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Botica } from '../../../models/Botica';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarbotica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarbotica.component.html',
  styleUrl: './listarbotica.component.css',
})
export class ListarboticaComponent implements OnInit {
  dataSource: MatTableDataSource<Botica> = new MatTableDataSource();
  role: string = '';
  email: string = '';

  displayedColumns:String[] = ['c1', 'c2', 'c3', 'c6', 'c7', 'accion01', 'accion02']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bS: BoticaService, private loginService:LoginService) {}
  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.bS.list().subscribe((data) => {
      if (this.role === 'Administrador'){
        this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idBotica - b.idBotica));
        this.dataSource.paginator = this.paginator;
      }
      if (this.role === 'DBotica'){
        const filtro = data.filter(b => b.usuario.correoUsuario == this.email)
        this.dataSource = new MatTableDataSource(filtro.sort((a, b) => a.idBotica - b.idBotica));
        this.dataSource.paginator = this.paginator;
      }

    });
    this.bS.getList().subscribe((data) => {
      if (this.role === 'Administrador || Cliente'){
        this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idBotica - b.idBotica));
        this.dataSource.paginator = this.paginator;
      }
      if (this.role === 'DBotica'){
        const filtro = data.filter(b => b.usuario.correoUsuario == this.email)
        this.dataSource = new MatTableDataSource(filtro.sort((a, b) => a.idBotica - b.idBotica));
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  eliminar(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
