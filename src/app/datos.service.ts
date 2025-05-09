import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  valorInicial: any = this.busquedaNodo();

  private url = environment.apiUrl;

  getProductosPorCategoria(categoria: string, filtro:string) : Observable<any>{
    //Si el parámetro recibido es "ofertas", realizar un if para que traiga todos los productos
    return this.http.get(`${this.url}getProductos/categoria?categoria=${categoria}&filtro=${filtro}`)
  }

  getProductosGeneral(productos: string, filtro:string): Observable<any>{
    console.log("se traeran los producos de " + productos)
    return this.http.get(`${this.url}getProductos/general?categoria=${productos}&filtro=${filtro}`)
  }

  getProductosEnOferta()  : Observable<any>{
    return this.http.get(`${this.url}getProductosOfertas`)
  }

  getProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.url}getProductos/id/${id}`);
  }

  getProductoPorNombre(id: string): Observable<any> {
    return this.http.get(`${this.url}getProductosPorNombre/nombre/${id}`);
  }

  busquedaDatosNombre = async (nombre: string) => {
    const response = await fetch(`${this.url}getProductos/nombre/${nombre}`);
    try {
      const data = await response.json();
      const listaProductos = data.data
      //console.log(listaProductos);
      return listaProductos;
    } catch (err) {
      console.log(err + "no existe");
    }
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
    const response = await fetch(`${this.url}getProductos/categoria?categoria=${categoria}`);
    try {
      const data = await response.json();
      const listaProductos = data.data
      //console.log(listaProductos);
      return listaProductos;
    } catch (err) {
      console.log(err + "no existe");
    }
  }

  calcularEnvio = async () => {
    const response = await fetch('http://localhost:3000/api/andreani/calcular-envio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contrato: "TU_CONTRATO_ANDREANI",
        origen: { codigoPostal: "1602" },
        destino: { codigoPostal: "2000" },
        bultos: [{ kilos: 2, volumenCm3: 5000 }]
      })
    })
    .then(response => response.json())
    .then(data => console.log('Costo de envío:', data))
    .catch(error => console.error('Error:', error));
  }

  /*productoDetallado(producto: string){
    let contenido = producto;
    console.log(contenido)
    localStorage.setItem('productoparaver', JSON.stringify(producto))
    this.productoParaVer = contenido;
  }*/

}
