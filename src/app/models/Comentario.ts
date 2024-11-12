import { ProductoxBotica } from "./ProductoxBotica"
import { Usuario } from "./Usuario"

export class Comentario{
    idComentario:number = 0
    detalleComentario:string = ""
    fechaComentario:Date = new Date(Date.now())
    pxBotica:ProductoxBotica = new ProductoxBotica()
    usuario:Usuario = new Usuario()
}