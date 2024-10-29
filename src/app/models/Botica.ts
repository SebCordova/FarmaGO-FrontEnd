import { Distrito } from "./Distrito"
import { Usuario } from "./Usuario"

export class Botica{
    idBotica:number = 0
    nombreBotica:string = ""
    ubicacionBotica:string = ""
    latitudBotica:string = ""
    longitudBotica:string = ""
    distrito:Distrito = new Distrito()
    usuario:Usuario = new Usuario()
}