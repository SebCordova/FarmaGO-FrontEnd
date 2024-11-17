import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleOrden } from '../../../models/DetalleOrden';
import { DetalleordenService } from '../../../services/detalleorden.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { OrdenCompra } from '../../../models/OrdenCompra';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { OrdencompraService } from '../../../services/ordencompra.service';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-creaeditardetalleorden',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './creaeditardetalleorden.component.html',
  styleUrl: './creaeditardetalleorden.component.css'
})
export class CreaeditardetalleordenComponent{

  form: FormGroup = new FormGroup({});
  do: DetalleOrden = new DetalleOrden();
  id: number = 0;
  edicion: boolean = false;
  role: string = '';
  email: string = '';

  listaOrdenCompra: OrdenCompra[] = []
  listaProductoxBotica: ProductoxBotica[] = []
  constructor(
    private doS: DetalleordenService,
    private formBuilder: FormBuilder,
    private router: Router,//importante este router NO es el Express
    private route: ActivatedRoute,
    private oS: OrdencompraService,
    private pS: ProductoxboticaService,
    private loginService: LoginService
  ) {}


  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //Capturar los datos que vienen de la lista s
      this.init();
    });

    this.form = this.formBuilder.group({
      hidDetalleOrden: [''],
      hcantidadProducto: ['', Validators.required],
      hprecioxCantidadProducto: ['', Validators.required],
      hOcompra: ['', Validators.required],
      hPxBotica: ['', Validators.required],

    });


    this.pS.list().subscribe(data =>{
      this.listaProductoxBotica = data
    })

    this.oS.list().subscribe(data =>{
      if (this.role === 'Administrador'){
        this.listaOrdenCompra = data
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(o => o.usuario.correoUsuario == this.email)
        this.listaOrdenCompra = filtro
      }

    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.do.idDetalleOrden = this.form.value.hidDetalleOrden;
      this.do.cantidadProducto = this.form.value.hcantidadProducto;
      this.do.precioxCantidadProducto = this.form.value.hprecioxCantidadProducto;
      this.do.ocompra.idOrdenCompra = this.form.value.hOcompra;
      this.do.pxBotica.idProductoxBotica = this.form.value.hPxBotica;
      if (this.edicion) {
        this.doS.update(this.do).subscribe((data) => {
          this.doS.list().subscribe((data) => {
            this.doS.setList(data);
          });
        });
      } else {
        this.doS.insert(this.do).subscribe((d) => {
          this.doS.list().subscribe((d) => {
            this.doS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['detalleorden']);
  }

  init() {
    if (this.edicion == true) {
      this.doS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidDetalleOrden: new FormControl(data.idDetalleOrden),
          hcantidadProducto: new FormControl(data.cantidadProducto),
          hprecioxCantidadProducto: new FormControl(data.precioxCantidadProducto),
          hOcompra: new FormControl(data.ocompra.idOrdenCompra),
          hPxBotica: new FormControl(data.pxBotica.idProductoxBotica),

        });
      });
    }
  }


}
