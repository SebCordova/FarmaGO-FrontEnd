import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-listarproductoxbotica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatCardModule,CommonModule,MatPaginatorModule,MatPaginator],
  templateUrl: './listarproductoxbotica.component.html',
  styleUrl: './listarproductoxbotica.component.css'
})
export class ListarproductoxboticaComponent {

  
  constructor(private pxbS:ProductoxboticaService){}

  datapxb = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {


    this.pxbS.list().subscribe((data) => {
      this.datapxb.data = data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica);

      this.datapxb.paginator= this.paginator;
    });
 
    // O si necesitas traer la segunda lista también
    this.pxbS.getList().subscribe((data) => {
      this.datapxb.data = data.sort((a, b) => a.idProductoxBotica - b.idProductoxBotica);

      this.datapxb.paginator = this.paginator;
    });
    
    
  }


  ngAfterViewInit(): void {
    this.datapxb.paginator = this.paginator;
  }

  

  eliminar(id: number) {
    this.pxbS.delete(id).subscribe((data) => {
      this.pxbS.list().subscribe((data) => {
        this.pxbS.setList(data);
      });
    });
  }
}

