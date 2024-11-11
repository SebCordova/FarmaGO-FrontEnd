import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditadistrito',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creaeditadistrito.component.html',
  styleUrl: './creaeditadistrito.component.css'
})
export class CreaeditadistritoComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  distrito: Distrito = new Distrito();
  id: number = 0;
  edicion: boolean = false;

  listaDistrito: { value: string; viewValue: string }[] = [
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'Chorrillos', viewValue: 'Chorrillos' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'Santiago de surco', viewValue: 'Santiago de surco' },
    { value: 'Miraflores', viewValue: 'Miraflores' },
    { value: 'La Molina', viewValue: 'La Molina' },
    { value: 'Barranco', viewValue: 'Barranco' },
    { value: 'San Borja', viewValue: 'San Borja' },
    { value: 'Lince', viewValue: 'Lince' },
    { value: 'Jesús María', viewValue: 'Jesús María' },
    { value: 'Pueblo Libre', viewValue: 'Pueblo Libre' },
    { value: 'Magdalena del Mar', viewValue: 'Magdalena del Mar' },
    { value: 'Rímac', viewValue: 'Rímac' },
    { value: 'Breña', viewValue: 'Breña' },
    { value: 'San Juan de Lurigancho', viewValue: 'San Juan de Lurigancho' },
    { value: 'Villa María del Triunfo', viewValue: 'Villa María del Triunfo' },
    { value: 'Villa El Salvador', viewValue: 'Villa El Salvador' },
    { value: 'San Juan de Miraflores', viewValue: 'San Juan de Miraflores' },
    { value: 'Ate', viewValue: 'Ate' },
    { value: 'Los Olivos', viewValue: 'Los Olivos' },
    { value: 'Comas', viewValue: 'Comas' },
  ];

  constructor(
    private dS: DistritoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init()
      //captura data que viene de la lista
    }),
      (this.form = this.formBuilder.group({
        hcodigo:[''],
        hdistrito: ['', Validators.required],
      }));
  }

  aceptar(): void {
    if (this.form.valid) {
      this.distrito.idDistrito = this.form.value.hcodigo;
      this.distrito.nomDistrito = this.form.value.hdistrito;

      if(this.edicion){
        this.dS.update(this.distrito).subscribe(data=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data);
          });
        });
      }else{
        this.dS.insert(this.distrito).subscribe((d) => {
          this.dS.list().subscribe((d) => {
            this.dS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['distritos']);
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idDistrito),
          hdistrito:new FormControl(data.nomDistrito)
        });
      });
    }
  }
}
