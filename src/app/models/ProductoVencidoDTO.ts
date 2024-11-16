export class ProductoVencidoDTO {
  idProductoxBotica: number = 0;
  NombreProducto: string = "";
  fechaVencimiento: Date = new Date(Date.now());
}
