import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentario[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Comentario[]>(this.url);
  }

  insert(comentario: Comentario) {
    return this.http.post(this.url, comentario);
  }

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Comentario>(`${this.url}/${id}`);
  }

  update(comentario: Comentario) {
    return this.http.put(this.url, comentario);
  }
}