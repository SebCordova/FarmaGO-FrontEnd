import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarususarioComponent } from './components/usuario/listarususario/listarususario.component';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';

export const routes: Routes = [{
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: ListarususarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarususarioComponent,
      },
    ],
}];
