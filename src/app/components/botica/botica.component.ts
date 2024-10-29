import { Component } from '@angular/core';
import { ListarboticaComponent } from './listarbotica/listarbotica.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-botica',
  standalone: true,
  imports: [ListarboticaComponent, RouterOutlet],
  templateUrl: './botica.component.html',
  styleUrl: './botica.component.css'
})
export class BoticaComponent {
  constructor(public route:ActivatedRoute){}
}
