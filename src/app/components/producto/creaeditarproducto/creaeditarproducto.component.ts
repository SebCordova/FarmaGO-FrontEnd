import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-creaeditarproducto',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './creaeditarproducto.component.html',
  styleUrl: './creaeditarproducto.component.css'
})
export class CreaeditarproductoComponent {

  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0;
  edicion: boolean = false;
  //selectedFile: File | null = null;

  constructor(
    private pS: ProductoService,
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
      hidProducto: [''],
      hnombreProducto: ['', Validators.required],
      hmarcaProducto: ['', Validators.required],
      hlabProducto: ['', Validators.required],
     // himagenProducto: ['']// Agrega el control para la imagen
    });


}

/*
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.pS.uploadImage(formData).subscribe((fileUrl: string) => {
      this.form.patchValue({ himagenProducto: fileUrl });
    });
  }
}*/

aceptar(): void {
  if (this.form.valid) {
    this.producto.idProducto = this.form.value.hidProducto;
    this.producto.nombreProducto = this.form.value.hnombreProducto;
    this.producto.marcaProducto = this.form.value.hmarcaProducto;
    this.producto.labProducto = this.form.value.hlabProducto;
    //this.producto.imagenProducto = this.form.value.himagenProducto;
    //console.log('Imagen del Producto:', this.producto.imagenProducto); // Agrega esta línea para ver la información
    if (this.edicion) {
      this.pS.update(this.producto).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
    } else {
      this.pS.insert(this.producto).subscribe((d) => {
        this.pS.list().subscribe((d) => {
          this.pS.setList(d);
        });
      });
    }
    
  }
  this.router.navigate(['productos']);
}

init() {
  if (this.edicion == true) {
    this.pS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        hidProducto: new FormControl(data.idProducto),
        hnombreProducto: new FormControl(data.nombreProducto),
        hmarcaProducto: new FormControl(data.marcaProducto),
        hlabProducto: new FormControl(data.labProducto),
       // himagenProducto: new FormControl(data.imagenProducto)

      });
    });
  }
}



}
