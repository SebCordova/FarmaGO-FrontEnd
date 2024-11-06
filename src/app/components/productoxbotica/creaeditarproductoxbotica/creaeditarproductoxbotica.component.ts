import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoxBotica } from '../../../models/ProductoxBotica';
import { ProductoxboticaService } from '../../../services/productoxbotica.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditarproductoxbotica',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './creaeditarproductoxbotica.component.html',
  styleUrl: './creaeditarproductoxbotica.component.css'
})
export class CreaeditarproductoxboticaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  pxb: ProductoxBotica = new ProductoxBotica();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pxbS: ProductoxboticaService,
    private formBuilder: FormBuilder,
    private router: Router,//importante este router NO es el Express
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //Capturar los datos que vienen de la lista s
      this.ngOnInit();
    });

    this.form = this.formBuilder.group({
      hidProductoxBotica: [''],
      hprecioproducto: ['', Validators.required],
      hfechaemision: ['', Validators.required],
      hfechavencimiento: ['', Validators.required],
      hbotica: ['', Validators.required],
      hproducto: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pxb.idProductoxBotica = this.form.value.hidProductoxBotica;
      this.pxb.precioproducto = this.form.value.hprecioproducto;
      this.pxb.fechaemision = this.form.value.hfechaemision;
      this.pxb.fechavencimiento = this.form.value.hfechavencimiento;
      this.pxb.botica = this.form.value.hbotica;
      this.pxb.producto = this.form.value.hproducto;
      if (this.edicion) {
        this.pxbS.update(this.pxb).subscribe((data) => {
          this.pxbS.list().subscribe((data) => {
            this.pxbS.setList(data);
          });
        });
      } else {
        this.pxbS.insert(this.pxb).subscribe((d) => {
          this.pxbS.list().subscribe((d) => {
            this.pxbS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['productosxbotica']);
  }

  init() {
    if (this.edicion == true) {
      this.pxbS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidProductoxBotica: new FormControl(data.idProductoxBotica),
          hnomUsuario: new FormControl(data.precioproducto),
          hapelUsuario: new FormControl(data.fechaemision),
          hdirUsuario: new FormControl(data.fechavencimiento),
          hcorreoUsuario: new FormControl(data.botica),
          hclaveUsuario: new FormControl(data.producto),
        });
      });
    }
  }



}
