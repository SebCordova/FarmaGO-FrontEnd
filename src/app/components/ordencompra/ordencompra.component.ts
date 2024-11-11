import { Component } from '@angular/core';
import { ListarordencompraComponent } from './listarordencompra/listarordencompra.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ordencompra',
  standalone: true,
  imports: [RouterOutlet, ListarordencompraComponent],
  templateUrl: './ordencompra.component.html',
  styleUrl: './ordencompra.component.css'
})
export class OrdencompraComponent {
  constructor(public route:ActivatedRoute){}
}
