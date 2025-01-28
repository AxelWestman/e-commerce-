import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}

  private carritoSubject = new BehaviorSubject<any[]>(this.obtenerCarrito());
  carrito$ = this.carritoSubject.asObservable();

  private carritoNum = new BehaviorSubject<number>(this.numeroProductosEnCarrito());
  carritoNum$ = this.carritoNum.asObservable();

  numeroDeProductosEnCarrito: any;

  obtenerCarrito(): any[] {
    // Verifica si localStorage está disponible
  if (typeof localStorage !== 'undefined') {
    // Intenta obtener el carrito del localStorage
    this.numeroDeProductosEnCarrito = localStorage.getItem('carrito');
    // Si existe, lo parsea y lo devuelve; si no, devuelve un array vacío
    return this.numeroDeProductosEnCarrito ? JSON.parse(this.numeroDeProductosEnCarrito) : [];
  } else {
    // Si localStorage no está disponible, muestra un mensaje de advertencia y devuelve un array vacío
    console.warn('localStorage no está disponible en este entorno.');
    return [];
  }
  }

  numeroProductosEnCarrito(){
    let carrito = this.obtenerCarrito();
    let longitud = carrito.length;
    return longitud;
    console.log()
  }

  agregarProducto(producto: any) {
    let carrito = this.obtenerCarrito();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    //mostrar un mensaje o actualizar la interfaz
    this.carritoSubject.next(carrito);
    this.carritoNum.next(carrito.length)
  }

  eliminarProducto(productoId: any) {
    let carrito = this.obtenerCarrito();
    carrito = carrito.filter((item: any) => item.nombre !== productoId.nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carritoSubject.next(carrito); // Notificar a los suscriptores
    this.carritoNum.next(carrito.length)
  }

  eliminarTodo() {
    localStorage.removeItem('carrito');
    this.carritoSubject.next([]);
    this.carritoNum.next(0)
    console.log('Carrito eliminado');
  }
}
