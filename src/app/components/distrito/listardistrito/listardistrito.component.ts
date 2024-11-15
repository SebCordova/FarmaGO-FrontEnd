import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listardistrito',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './listardistrito.component.html',
  styleUrl: './listardistrito.component.css'
})
export class ListardistritoComponent implements OnInit{

  dataSource:MatTableDataSource<Distrito> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2', 'accion01', 'accion02']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS:DistritoService){}
  ngOnInit(): void{
    this.dS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.dS.delete(id).subscribe(data=>{
      this.dS.list().subscribe(data=>{
        this.dS.setList(data);
      })
    })
  }
}
