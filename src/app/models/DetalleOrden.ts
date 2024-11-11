import { OrdenCompra } from "./OrdenCompra"
import { ProductoxBotica } from "./ProductoxBotica"

export class DetalleOrden{
    idDetalleOrden:number = 0
    cantidadProducto:number = 0
    precioxCantidadProducto:number = 0
    ocompra:OrdenCompra = new OrdenCompra()
    pxBotica:ProductoxBotica = new ProductoxBotica()
}