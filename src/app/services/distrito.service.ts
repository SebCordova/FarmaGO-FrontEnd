import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Distrito } from '../models/Distrito';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private url = `${base_url}/distritos`;
  private listaCambio = new Subject<Distrito[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Distrito[]>(this.url);
  }

  insert(distrito: Distrito) {
    return this.http.post(this.url, distrito);
  }

  setList(listaNueva: Distrito[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Distrito>(`${this.url}/${id}`);
  }

  update(distrito: Distrito) {
    return this.http.put(this.url, distrito);
  }
}
