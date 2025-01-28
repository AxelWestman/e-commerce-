import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor() {}

  private carritoSubject = new BehaviorSubject<any[]>(this.obtenerCarrito());
  carrito$ = this.carritoSubject.asObservable();

  obtenerCarrito(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  agregarProducto(producto: any) {
    let carrito = this.obtenerCarrito();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    //mostrar un mensaje o actualizar la interfaz
    this.carritoSubject.next(carrito);
  }

  eliminarProducto(productoId: any) {
    let carrito = this.obtenerCarrito();
    carrito = carrito.filter((item: any) => item.nombre !== productoId.nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carritoSubject.next(carrito); // Notificar a los suscriptores
  }

  eliminarTodo() {
    localStorage.removeItem('carrito');
    this.carritoSubject.next([]);
    console.log('Carrito eliminado');
  }
}
