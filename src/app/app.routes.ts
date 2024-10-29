import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';

export const routes: Routes = [{
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarususarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarususarioComponent,
      },
    ],
}];
