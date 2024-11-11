import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/Rol';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, CommonModule, MatSelectModule, MatButtonModule, MatInputModule],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css',
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;

  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'Cliente', viewValue: 'Cliente' },
    { value: 'DBotica', viewValue: 'DBotica' },
    { value: 'Administrador', viewValue: 'Administrador' },
  ];

  listaUsuarios: Usuario[] = [];

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hrolUsuario: ['', Validators.required],
      huser: ['', Validators.required],
    });

    this.uS.list().subscribe(data =>{
      this.listaUsuarios = data
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.hcodigo;
      this.rol.rolUsuario = this.form.value.hrolUsuario
      this.rol.user.idUsuario = this.form.value.huser

      if (this.edicion) {
        this.rS.update(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((d) => {
          this.rS.list().subscribe((d) => {
            this.rS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['roles']);
  }
  init() {
    if (this.edicion == true) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRol),
          hrolUsuario: new FormControl(data.rolUsuario),
          huser: new FormControl(data.user.idUsuario),
        });
      });
    }
  }
}
