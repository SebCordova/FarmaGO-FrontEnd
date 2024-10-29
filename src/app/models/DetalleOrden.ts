import { OrdenCompra } from "./OrdenCompra"
import { ProductoxBotica } from "./ProductoxBotica"

export class DetalleOrden{
    idDetalleOrden:number = 0
    cantidadProducto:number = 0
    precioxCantidadProducto:number = 0
    Ocompra:OrdenCompra = new OrdenCompra()
    PxBotica:ProductoxBotica = new ProductoxBotica()
}