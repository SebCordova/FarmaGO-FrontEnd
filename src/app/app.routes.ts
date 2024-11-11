import { Routes } from '@angular/router';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { CreaeditadistritoComponent } from './components/distrito/creaeditadistrito/creaeditadistrito.component';
import { OrdencompraComponent } from './components/ordencompra/ordencompra.component';
import { CreaeditaordencompraComponent } from './components/ordencompra/creaeditaordencompra/creaeditaordencompra.component';

export const routes: Routes = [
  {
    path: 'distritos',
    component: DistritoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditadistritoComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditadistritoComponent,
      },
    ],
  },{
    path: 'ordenescompras',
    component: OrdencompraComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaordencompraComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaordencompraComponent,
      },
    ],
  },
];
