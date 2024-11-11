import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproductoxboticaComponent } from "./listarproductoxbotica/listarproductoxbotica.component";

@Component({
  selector: 'app-productoxbotica',
  standalone: true,
  imports: [ListarproductoxboticaComponent,RouterOutlet],
  templateUrl: './productoxbotica.component.html',
  styleUrl: './productoxbotica.component.css'
})
export class ProductoxboticaComponent {
  constructor(public route:ActivatedRoute){}
}
