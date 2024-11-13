import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();

  displayedColumns: string[] = [
    'cd1',
    'cd2',
    'cd3',
    'cd4',
    'cd5',
    'accion01',
    'accion02',
  ];

  constructor(private cS: ComentarioService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idComentario - b.idComentario));
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.sort((a, b) => a.idComentario - b.idComentario));
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
