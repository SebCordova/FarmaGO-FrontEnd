import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarproductoxbotica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarproductoxbotica.component.html',
  styleUrl: './listarproductoxbotica.component.css'
})
export class ListarproductoxboticaComponent {

  dataSource: MatTableDataSource<ProductoxBotica> = new MatTableDataSource();

  displayedColumns: String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','accion01', 'accion02'];

  constructor(private pxbS:ProductoxboticaService){}


  ngOnInit(): void {
    this.pxbS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica));
    });
    this.pxbS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica));
    });
  }

  eliminar(id: number) {
    this.pxbS.delete(id).subscribe((data) => {
      this.pxbS.list().subscribe((data) => {
        this.pxbS.setList(data);
      });
    });
  }
}

