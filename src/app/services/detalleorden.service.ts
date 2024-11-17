import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DetalleOrden } from '../models/DetalleOrden';
import { ProductoVendidoxBoticaDTO } from '../models/ProductoVendidoxBoticaDTO';
import { BoticasConMayoresVentasDTO } from '../models/BoticaConMayoresVentasDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DetalleordenService {


  private url = `${base_url}/detalleOrden`; //esta ruta viene del backend
  private listaCambio = new Subject<DetalleOrden[]>(); //Agregamos un objeto del modelo

  constructor(private http: HttpClient) { }


  list() {
    return this.http.get<DetalleOrden[]>(this.url);
  }

  insert(detalleord: DetalleOrden) {
    return this.http.post(this.url, detalleord);
  }

  setList(listaNueva: DetalleOrden[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<DetalleOrden>(`${this.url}/${id}`);
  }

  update(detalleord: DetalleOrden) {
    return this.http.put(this.url, detalleord);
  }

  getCantidad():Observable<ProductoVendidoxBoticaDTO[]>{
    return this.http.get<ProductoVendidoxBoticaDTO[]>(
      `${this.url}/productovendidoxbotica`
    )
  }

  getBoticasMayorVenta():Observable<BoticasConMayoresVentasDTO[]>{
    return this.http.get<BoticasConMayoresVentasDTO[]>(
      `${this.url}/boticasconmayoresventas`
    )
  }
}

