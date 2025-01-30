import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }

   // Usamos un Subject para emitir los cambios de datos
   private dataSubject = new BehaviorSubject<any>(null);  // Valor inicial definido

   // Observable para que otros componentes puedan suscribirse
   data$ = this.dataSubject.asObservable();

  contenidoParaCargar = "";

  productoParaVer: any;


  datoParaContenido(data: any){
    if (data !== undefined) {
      this.dataSubject.next(data);  // Solo enviamos datos que no sean undefined
    } else {
      console.warn('Intentando enviar un dato undefined');
    }
  }

  //Obtener productos por categoría:
  busquedaDatosCategoria = async (categoria: string) => {
    const response = await fetch(`http://192.168.0.164:3000/api/getProductos/categoria/${categoria}`);
    try {
      const data = await response.json();
      const listaProductos = data.data
      //console.log(listaProductos);
      return listaProductos;
    } catch (err) {
      console.log(err + "no existe");
    }
  }

  productoDetallado(producto: string){
    let contenido = producto;
    console.log(contenido)
    this.productoParaVer = contenido;
  }

}
