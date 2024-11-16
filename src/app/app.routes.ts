import { Routes } from '@angular/router';
import { DistritoComponent } from './components/distrito/distrito.component';
import { CreaeditadistritoComponent } from './components/distrito/creaeditadistrito/creaeditadistrito.component';
import { OrdencompraComponent } from './components/ordencompra/ordencompra.component';
import { CreaeditaordencompraComponent } from './components/ordencompra/creaeditaordencompra/creaeditaordencompra.component';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';
import { BoticaComponent } from './components/botica/botica.component';
import { RolComponent } from './components/rol/rol.component';
import { CreaeditarboticaComponent } from './components/botica/creaeditarbotica/creaeditarbotica.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CreaeditarproductoComponent } from './components/producto/creaeditarproducto/creaeditarproducto.component';
import { ProductoxboticaComponent } from './components/productoxbotica/productoxbotica.component';
import { CreaeditarproductoxboticaComponent } from './components/productoxbotica/creaeditarproductoxbotica/creaeditarproductoxbotica.component';
import { DetalleordenComponent } from './components/detalleorden/detalleorden.component';
import { CreaeditardetalleordenComponent } from './components/detalleorden/creaeditardetalleorden/creaeditardetalleorden.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditacomentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportevencidosComponent } from './components/reportes/reportevencidos/reportevencidos.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
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
    canActivate: [seguridadGuard],
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
    canActivate: [seguridadGuard],
  },
{
    path: 'productos',
    component: ProductoComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarproductoComponent,
      },
      {
        path: 'edicionesp/:id',
        component: CreaeditarproductoComponent,
      },
    ],  
    canActivate: [seguridadGuard],
  },
  {
  
    path: 'productosxbotica',
    component: ProductoxboticaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarproductoxboticaComponent,
      },
      {
        path: 'edicionespxb/:id',
        component: CreaeditarproductoxboticaComponent,
      },
    ],
    canActivate: [seguridadGuard],
}
,{
  
  path: 'detalleorden',
  component: DetalleordenComponent,
  children: [
    {
      path: 'nuevo',
      component: CreaeditardetalleordenComponent,
    },
    {
      path: 'edicionesdo/:id',
      component: CreaeditardetalleordenComponent,
    },
  ],
  canActivate: [seguridadGuard],

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
  canActivate: [seguridadGuard],
},{
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
  canActivate: [seguridadGuard],
}
,
{
  path: 'comentarios',
  component: ComentarioComponent,
  children: [
    {
      path: 'nuevo',
      component: CreaeditacomentarioComponent,
    },
    {
      path: 'ediciones/:id',
      component: CreaeditacomentarioComponent,
    },
  ],
  canActivate: [seguridadGuard],
},
{
  path: 'reportes',
  component: ReportesComponent,
  children: [
    {
      path: 'vencidos',
      component: ReportevencidosComponent
    }
  ],
  canActivate: [seguridadGuard],
},
{
  path: 'homes',
  component: HomeComponent,
  canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
},
];