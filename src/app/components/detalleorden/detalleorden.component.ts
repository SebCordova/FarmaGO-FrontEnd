import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetalleordenComponent } from "./listardetalleorden/listardetalleorden.component";

@Component({
  selector: 'app-detalleorden',
  standalone: true,
  imports: [ListardetalleordenComponent, RouterOutlet],
  templateUrl: './detalleorden.component.html',
  styleUrl: './detalleorden.component.css'
})
export class DetalleordenComponent {

  constructor(public route:ActivatedRoute){}
}
