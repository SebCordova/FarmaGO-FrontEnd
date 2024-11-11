import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditarususarioComponent } from './components/usuario/creaeditarususario/creaeditarususario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CreaeditarproductoComponent } from './components/producto/creaeditarproducto/creaeditarproducto.component';
import { ProductoxboticaComponent } from './components/productoxbotica/productoxbotica.component';
import { CreaeditarproductoxboticaComponent } from './components/productoxbotica/creaeditarproductoxbotica/creaeditarproductoxbotica.component';
import { DetalleordenComponent } from './components/detalleorden/detalleorden.component';
import { CreaeditardetalleordenComponent } from './components/detalleorden/creaeditardetalleorden/creaeditardetalleorden.component';

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
  },{
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
    
},{
  
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

}



];
