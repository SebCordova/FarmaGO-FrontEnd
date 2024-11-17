import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ProductoxBotica } from '../models/ProductoxBotica';
import { HttpClient } from '@angular/common/http';
import { ProductoVencidoDTO } from '../models/ProductoVencidoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProductoxboticaService {
  private url = `${base_url}/productoxBotica`;
  private listaCambio = new Subject<ProductoxBotica[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ProductoxBotica[]>(this.url);
  }

  insert(productxboti: ProductoxBotica) {
    return this.http.post(this.url, productxboti);
  }

  setList(listaNueva: ProductoxBotica[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ProductoxBotica>(`${this.url}/${id}`);
  }

  update(productxboti: ProductoxBotica) {
    return this.http.put(this.url, productxboti);
  }

  getVencidos(id: number): Observable<ProductoVencidoDTO[]> {
    return this.http.get<ProductoVencidoDTO[]>(
      `${this.url}/productosvencidos?idBotica=${id}`
    );
  }
}
