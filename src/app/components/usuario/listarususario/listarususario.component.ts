import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarususario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarususario.component.html',
  styleUrl: './listarususario.component.css'
})
export class ListarususarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  displayedColumns: String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'accion01', 'accion02'];

  constructor(private uS:UsuarioService){}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idUsuario - b.idUsuario));
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idUsuario - b.idUsuario));
    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
