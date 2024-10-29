import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Botica } from '../models/Botica';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BoticaService {
  private url = `${base_url}/boticas`;
  private listaCambio = new Subject<Botica[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Botica[]>(this.url);
  }

  insert(botica: Botica) {
    return this.http.post(this.url, botica);
  }

  setList(listaNueva: Botica[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Botica>(`${this.url}/${id}`);
  }

  update(botica: Botica) {
    return this.http.put(this.url, botica);
  }
}
