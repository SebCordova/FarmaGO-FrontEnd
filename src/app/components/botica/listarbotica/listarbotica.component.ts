import { Component, OnInit } from '@angular/core';
import { BoticaService } from '../../../services/botica.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Botica } from '../../../models/Botica';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarbotica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarbotica.component.html',
  styleUrl: './listarbotica.component.css',
})
export class ListarboticaComponent implements OnInit {
  dataSource: MatTableDataSource<Botica> = new MatTableDataSource();

  displayedColumns:String[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01', 'accion02']

  constructor(private bS: BoticaService) {}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idBotica - b.idBotica));
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idBotica - b.idBotica));
    });
  }
  eliminar(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }
}
