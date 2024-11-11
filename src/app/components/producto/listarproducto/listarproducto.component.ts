import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarproducto',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatCardModule,CommonModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent {


  datas: any[] = []; 

  constructor(private pS:ProductoService){}

  ngOnInit(): void {


    this.pS.list().subscribe((data) => {
      this.datas = data.sort((a, b) => a.idProducto - b.idProducto);
    });

    // O si necesitas traer la segunda lista también
    this.pS.getList().subscribe((data) => {
      this.datas = data.sort((a, b) => a.idProducto - b.idProducto);
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
