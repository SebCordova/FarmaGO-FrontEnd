import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportedistritoComponent } from './reportedistrito/reportedistrito.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportedistritoComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
