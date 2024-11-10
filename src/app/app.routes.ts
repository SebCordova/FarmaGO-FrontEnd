import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';
import { BoticaComponent } from './components/botica/botica.component';
import { RolComponent } from './components/rol/rol.component';
import { CreaeditarboticaComponent } from './components/botica/creaeditarbotica/creaeditarbotica.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';

export const routes: Routes = [
  {
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
  },
  {
    path: 'boticas',
    component: BoticaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarboticaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarboticaComponent,
      },
    ],
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarolComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarolComponent,
      },
    ],
  },
];
