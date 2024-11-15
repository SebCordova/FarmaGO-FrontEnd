import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrdenCompra } from '../../../models/OrdenCompra';
import { OrdencompraService } from '../../../services/ordencompra.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditaordencompra',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './creaeditaordencompra.component.html',
  styleUrl: './creaeditaordencompra.component.css',
})
export class CreaeditaordencompraComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  orden: OrdenCompra = new OrdenCompra();
  id: number = 0;
  edicion: boolean = false;
  role: string = '';
  email: string = '';

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Completada', viewValue: 'Completada' },
    { value: 'En Proceso', viewValue: 'En Proceso' },
    { value: 'Cancelada', viewValue: 'Cancelada' },
  ];

  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private oS: OrdencompraService,
    private router: Router,
    private uS: UsuarioService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init()
      //captura data que viene de la lista
    }),
      (this.form = this.formBuilder.group({
      hcodigo: [''],
      hfecha: ['', Validators.required],
      hmonto: ['', Validators.required],
      hestado: ['', Validators.required],
      husuario: ['', Validators.required],
    }));
    this.uS.list().subscribe(data=>{
      if (this.role === 'Administrador'){
        this.listaUsuarios=data
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(u => u.correoUsuario == this.email)
        this.listaUsuarios=filtro
      }

    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.orden.idOrdenCompra = this.form.value.hcodigo;
      this.orden.fechaOrden = this.form.value.hfecha;
      this.orden.montoOrden = this.form.value.hmonto;
      this.orden.estadoOrden = this.form.value.hestado;
      this.orden.usuario.idUsuario = this.form.value.husuario;

      if(this.edicion){
        this.oS.update(this.orden).subscribe(data=>{
          this.oS.list().subscribe((data)=>{
            this.oS.setList(data);
          });
        });
      }else{
        this.oS.insert(this.orden).subscribe((data) => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['ordenescompras'])
  }
  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idOrdenCompra),
          hfecha:new FormControl(data.fechaOrden),
          hmonto:new FormControl(data.montoOrden),
          hestado:new FormControl(data.estadoOrden),
          husuario:new FormControl(data.usuario.idUsuario)
        });
      });
    }
  }
}
