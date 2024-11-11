import { Component } from '@angular/core';
import { ListarcomentarioComponent } from './listarcomentario/listarcomentario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [RouterOutlet, ListarcomentarioComponent],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {
  constructor(public route:ActivatedRoute){}
}
