import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/Producto';
import { HttpClient } from '@angular/common/http';
import { MarcaRegistradaDTO } from '../models/MarcaRegistradaDTO';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = `${base_url}/productos`;
  private listaCambio = new Subject<Producto[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Producto[]>(this.url);
  }

  insert(producto: Producto) {
    return this.http.post(this.url, producto);
  }

  setList(listaNueva: Producto[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  update(producto: Producto) {
    return this.http.put(this.url, producto);
  }

 /* uploadImage(file: FormData): Observable<string> {
    return this.http.post<string>( `${this.url}/upload`, file);
  }*/
    getMarcaMasRegistrada():Observable<MarcaRegistradaDTO[]>{
         return this.http.get<MarcaRegistradaDTO[]>(`${this.url}/marcasmasregistradas`)
       }
}
