import { Botica } from "./Botica"
import { Producto } from "./Producto"

export class ProductoxBotica{
    idProductoxBotica:number = 0
    precioproducto:number = 0
    fechaemision:Date = new Date()
    fechavencimiento:Date = new Date()
    botica:Botica = new Botica()
    producto:Producto = new Producto()
}