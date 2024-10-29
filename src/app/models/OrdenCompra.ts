import { Usuario } from "./Usuario"

export class OrdenCompra{
    idOrdenCompra:number = 0
    fechaOrden:Date = new Date(Date.now())
    montoOrden:number = 0
    estadoOrden:string = ""
    usuario:Usuario = new Usuario()
}