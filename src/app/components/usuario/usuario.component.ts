import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarususarioComponent } from './listarususario/listarususario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ListarususarioComponent, RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){}
}
