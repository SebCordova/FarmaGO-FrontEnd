import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdenCompra } from '../../../models/OrdenCompra';
import { OrdencompraService } from '../../../services/ordencompra.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarordencompra',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarordencompra.component.html',
  styleUrl: './listarordencompra.component.css',
})
export class ListarordencompraComponent {
  dataSource: MatTableDataSource<OrdenCompra> = new MatTableDataSource();

  displayedColumns: string[] = [
    'cd1',
    'cd2',
    'cd3',
    'cd4',
    'cd5',
    'accion01',
    'accion02',
  ];

  constructor(private oS: OrdencompraService) {}

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
