import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/Rol';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit{
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();

  displayedColumns: String[] = ['c1', 'c2', 'c3', 'accion01'];

  constructor(private rS: RolService) {}
  
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idRol - b.idRol));
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idRol - b.idRol));
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
