import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarproducto',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent {

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  displayedColumns: String[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];

  constructor(private pS:ProductoService){}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idProducto - b.idProducto));
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idProducto - b.idProducto));
    });
    
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }


}
