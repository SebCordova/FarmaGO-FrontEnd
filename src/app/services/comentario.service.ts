import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Comentario } from '../models/Comentario';
import { HttpClient } from '@angular/common/http';
import { UsuarioComentarioDTO } from '../models/UsuarioComentarioDTO';

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
  getComentarioUsuario():Observable<UsuarioComentarioDTO[]>{
    return this.http.get<UsuarioComentarioDTO[]>(`${this.url}/usuariosmascomentarios`)
  }
}
