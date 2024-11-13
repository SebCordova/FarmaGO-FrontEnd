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

  listaProductoXBotica: ProductoxBotica[] = [];
  listaUsuario: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cS: ComentarioService,
    private router: Router,
    private uS: UsuarioService,
    private pbS: ProductoxboticaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      //captura data que viene de la lista
    }),
      (this.form = this.formBuilder.group({
        hcodigo: [''],
        hdetalle: ['', Validators.required],
        hfecha: ['', Validators.required],
        hproxbot: ['', Validators.required],
        husuario: ['', Validators.required],
      }));
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
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
      this.comen.PxBotica.idProductoxBotica = this.form.value.hproxbot;
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
          hfecha: new FormControl(data.detalleComentario),
          hmonto: new FormControl(data.fechaComentario),
          hproxbot: new FormControl(data.PxBotica.idProductoxBotica),
          husuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}