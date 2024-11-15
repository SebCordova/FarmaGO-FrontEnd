import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdenCompra } from '../../../models/OrdenCompra';
import { OrdencompraService } from '../../../services/ordencompra.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarordencompra',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarordencompra.component.html',
  styleUrl: './listarordencompra.component.css',
})
export class ListarordencompraComponent {
  dataSource: MatTableDataSource<OrdenCompra> = new MatTableDataSource();
  role: string = '';
  email: string = '';

  displayedColumns: string[] = [
    'cd1',
    'cd2',
    'cd3',
    'cd4',
    'cd5',
    'accion01',
    'accion02',
  ];

  constructor(private oS: OrdencompraService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.oS.list().subscribe((data) => {
      if (this.role === 'Administrador'){
        this.dataSource = new MatTableDataSource(
          data.sort((a, b) => a.idOrdenCompra - b.idOrdenCompra)
        );
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(o => o.usuario.correoUsuario == this.email)
        this.dataSource = new MatTableDataSource(
          filtro.sort((a, b) => a.idOrdenCompra - b.idOrdenCompra)
        );
      }
    });
    this.oS.getList().subscribe((data) => {
      if (this.role === 'Administrador'){
        this.dataSource = new MatTableDataSource(
          data.sort((a, b) => a.idOrdenCompra - b.idOrdenCompra)
        );
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(o => o.usuario.correoUsuario == this.email)
        this.dataSource = new MatTableDataSource(
          filtro.sort((a, b) => a.idOrdenCompra - b.idOrdenCompra)
        );
      }
    });
  }
  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
      });
    });
  }
}
