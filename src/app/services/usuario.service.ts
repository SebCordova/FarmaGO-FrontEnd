import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/Usuario';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  update(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }
}
