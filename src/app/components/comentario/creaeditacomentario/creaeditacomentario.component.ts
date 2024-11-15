import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Comentario } from '../../../models/Comentario';
import { Usuario } from '../../../models/Usuario';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ComentarioService } from '../../../services/comentario.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.css',
})
export class CreaeditacomentarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comen: Comentario = new Comentario();
  id: number = 0;
  edicion: boolean = false;
  role: string = '';
  email: string = '';
  fechaHoy: Date = new Date(Date.now())

  listaProductoXBotica: ProductoxBotica[] = [];
  listaUsuario: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cS: ComentarioService,
    private router: Router,
    private uS: UsuarioService,
    private pbS: ProductoxboticaService,
    private route: ActivatedRoute,
    private loginService:LoginService
  ) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      //captura data que viene de la lista
    }),
      (this.form = this.formBuilder.group({
        hcodigo: [''],
        hdetalle: ['', Validators.required],
        hfecha: [this.fechaHoy, Validators.required],
        hproxbot: ['', Validators.required],
        husuario: ['', Validators.required],
      }));
    this.uS.list().subscribe((data) => {
      if (this.role === 'Administrador'){
        this.listaUsuario = data;
      }
      if (this.role === 'Cliente'){
        const filtro = data.filter(u => u.correoUsuario == this.email)
        this.listaUsuario = filtro
      }
    });
    this.pbS.list().subscribe((data) => {
      this.listaProductoXBotica = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comen.idComentario = this.form.value.hcodigo;
      this.comen.detalleComentario = this.form.value.hdetalle;
      this.comen.fechaComentario = this.form.value.hfecha;
      this.comen.pxBotica.idProductoxBotica = this.form.value.hproxbot;
      this.comen.usuario.idUsuario = this.form.value.husuario;

      if (this.edicion) {
        this.cS.update(this.comen).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comen).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['comentarios']);
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idComentario),
          hdetalle: new FormControl(data.detalleComentario),
          hfecha: new FormControl(this.fechaHoy),
          hproxbot: new FormControl(data.pxBotica.idProductoxBotica),
          husuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}

