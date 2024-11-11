import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrdenCompra } from '../models/OrdenCompra';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OrdencompraService {

  private url = `${base_url}/ordenescompras`;
  private listaCambio = new Subject<OrdenCompra[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<OrdenCompra[]>(this.url);
  }

  insert(ordencompra: OrdenCompra) {
    return this.http.post(this.url, ordencompra);
  }

  setList(listaNueva: OrdenCompra[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<OrdenCompra>(`${this.url}/${id}`);
  }

  update(ordencompra: OrdenCompra) {
    return this.http.put(this.url, ordencompra);
  }
}
