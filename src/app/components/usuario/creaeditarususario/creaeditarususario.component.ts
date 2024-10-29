import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditarususario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './creaeditarususario.component.html',
  styleUrl: './creaeditarususario.component.css',
})
export class CreaeditarususarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //Capturar los datos que vienen de la lista s
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnomUsuario: ['', Validators.required],
      hapelUsuario: ['', Validators.required],
      hdirUsuario: ['', Validators.required],
      hcorreoUsuario: ['', Validators.required],
      hclaveUsuario: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.nomUsuario = this.form.value.hnomUsuario;
      this.usuario.apelUsuario = this.form.value.hapelUsuario;
      this.usuario.dirUsuario = this.form.value.hdirUsuario;
      this.usuario.correoUsuario = this.form.value.hcorreoUsuario;
      this.usuario.claveUsuario = this.form.value.hclaveUsuario;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((d) => {
          this.uS.list().subscribe((d) => {
            this.uS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }
  init() {
    if (this.edicion == true) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUsuario),
          hnomUsuario: new FormControl(data.nomUsuario),
          hapelUsuario: new FormControl(data.apelUsuario),
          hdirUsuario: new FormControl(data.dirUsuario),
          hcorreoUsuario: new FormControl(data.correoUsuario),
          hclaveUsuario: new FormControl(data.claveUsuario),
        });
      });
    }
  }
}
