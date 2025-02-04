import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  valorInicial: any = this.busquedaNodo();

  getProductosPorCategoria(categoria: string) : Observable<any>{
    return this.http.get(`http://192.168.0.164:3000/api/getProductos/categoria?categoria=${categoria}`)
  }

  getProductoPorId(id: string): Observable<any> {
    return this.http.get(`http://192.168.0.164:3000/api/getProductos/id/${id}`);
  }

  busquedaNodo(){
    if(typeof localStorage !== 'undefined') {
    let prueba = localStorage.getItem('nodo');
    return prueba ? JSON.parse(prueba) : null;
    } else {
      // Si localStorage no está disponible, muestra un mensaje de advertencia y devuelve un array vacío
      console.warn('localStorage no está disponible en este entorno.');
      return [];
    }
  }

   // Usamos un Subject para emitir los cambios de datos
   private dataSubject = new BehaviorSubject<any>(this.valorInicial);  // Valor inicial definido

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
  busquedaDatosCategoria = async (categoria: any) => {
    const response = await fetch(`http://192.168.0.164:3000/api/getProductos/categoria?categoria=${categoria}`);
    try {
      const data = await response.json();
      const listaProductos = data.data
      //console.log(listaProductos);
      return listaProductos;
    } catch (err) {
      console.log(err + "no existe");
    }
  }

  /*productoDetallado(producto: string){
    let contenido = producto;
    console.log(contenido)
    localStorage.setItem('productoparaver', JSON.stringify(producto))
    this.productoParaVer = contenido;
  }*/

}
