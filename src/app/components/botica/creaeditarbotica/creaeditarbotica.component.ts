import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Botica } from '../../../models/Botica';
import { BoticaService } from '../../../services/botica.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/Usuario';
import { Distrito } from '../../../models/Distrito';
import { UsuarioService } from '../../../services/usuario.service';
import { DistritoService } from '../../../services/distrito.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditarbotica',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, CommonModule, MatSelectModule, MatButtonModule, MatInputModule],
  templateUrl: './creaeditarbotica.component.html',
  styleUrl: './creaeditarbotica.component.css',
})
export class CreaeditarboticaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  botica: Botica = new Botica();
  id: number = 0;
  edicion: boolean = false;
  role: string = '';
  email: string = '';

  listaUsuarios: Usuario[] = [];

  listaDistritos: Distrito[] = [];

  constructor(
    private bS: BoticaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private dS: DistritoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.role = this.loginService.showRole();
    this.email = this.loginService.showEmail();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombreBotica: ['', Validators.required],
      hubicacionBotica: ['', Validators.required],
      hlatitudBotica: ['', Validators.required],
      hlongitudBotica: ['', Validators.required],
      hdistrito: ['', Validators.required],
      husuario: ['', Validators.required],
    });

    this.uS.list().subscribe(data =>{
      if (this.role === 'Administrador'){
        this.listaUsuarios = data
      }
      if (this.role === 'DBotica'){
        const filtro = data.filter(u => u.correoUsuario == this.email)
        this.listaUsuarios = filtro
      }

    })

    this.dS.list().subscribe(data =>{
      this.listaDistritos = data
    })
  
  }
  aceptar(): void {
    if (this.form.valid) {
      this.botica.idBotica = this.form.value.hcodigo;
      this.botica.nombreBotica = this.form.value.hnombreBotica;
      this.botica.ubicacionBotica = this.form.value.hubicacionBotica;
      this.botica.latitudBotica = this.form.value.hlatitudBotica;
      this.botica.longitudBotica = this.form.value.hlongitudBotica;
      this.botica.distrito.idDistrito = this.form.value.hdistrito;
      this.botica.usuario.idUsuario = this.form.value.husuario;

      if (this.edicion) {
        this.bS.update(this.botica).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      } else {
        this.bS.insert(this.botica).subscribe((d) => {
          this.bS.list().subscribe((d) => {
            this.bS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['boticas']);
  }
  init() {
    if (this.edicion == true) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idBotica),
          hnombreBotica: new FormControl(data.nombreBotica),
          hubicacionBotica: new FormControl(data.ubicacionBotica),
          hlatitudBotica: new FormControl(data.latitudBotica),
          hlongitudBotica: new FormControl(data.longitudBotica),
          hdistrito: new FormControl(data.distrito.idDistrito),
          husuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}
