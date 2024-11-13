import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ListarususarioComponent } from './components/usuario/listarususario/listarususario.component';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ListarususarioComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FarmaGO';

  role: string = '';
  email: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    return this.loginService.verificar();
  }
  isDBotica() {
    return this.role === 'DBotica';
  }

  isCliente() {
    return this.role === 'Cliente';
  }

  isAdministrador() {
    return this.role === 'Administrador';
  }
}
