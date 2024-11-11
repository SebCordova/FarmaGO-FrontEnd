import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Producto } from '../models/Producto';
import { HttpClient } from '@angular/common/http';


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
}
