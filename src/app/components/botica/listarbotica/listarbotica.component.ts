import { Component, OnInit } from '@angular/core';
import { BoticaService } from '../../../services/botica.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Botica } from '../../../models/Botica';

@Component({
  selector: 'app-listarbotica',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarbotica.component.html',
  styleUrl: './listarbotica.component.css',
})
export class ListarboticaComponent implements OnInit {
  dataSource: MatTableDataSource<Botica> = new MatTableDataSource();
  constructor(private bS: BoticaService) {}
  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
