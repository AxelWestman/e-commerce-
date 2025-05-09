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

  cantidadProducto:number = 0;

  carrito: any[] = []; 
  subtotal: number = 0;

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
    console.log(carrito)
    let verificacion = carrito.some(item => item.nombre === producto.nombre);
    console.log(verificacion)
    if(verificacion == true){
      let posicionEnArray = carrito.findIndex(item => item.nombre === producto.nombre);
      console.log(posicionEnArray);
      let cantidadActual = carrito[posicionEnArray].cantidad;
      if(cantidadActual < carrito[posicionEnArray].stock){
      let cantidadActualizada = cantidadActual + 1;
      console.log("ahora es: " + cantidadActualizada)
      carrito[posicionEnArray].cantidad = cantidadActualizada;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      this.carritoSubject.next(carrito);
      } else {
        alert("No puedes agregar mas veces este producto porque ya has agregado el máximo de existencia de este producto")
      }
    }
    else {
    producto = {cantidad: 1, ...producto}
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.cantidadProducto++;
    console.log(`Se agrego el primer ${producto.nombre} en el carro`)
    //mostrar un mensaje o actualizar la interfaz
    this.carritoSubject.next(carrito);
    this.carritoNum.next(carrito.length)
    }
  }

  agregarCantidadDeProducto(producto: any){
    let carrito = this.obtenerCarrito();
    console.log(carrito)
    let posicionEnArray = carrito.findIndex(item => item.nombre === producto.nombre);
    console.log(posicionEnArray)
      let cantidadActual = carrito[posicionEnArray].cantidad;
      if(carrito[posicionEnArray].stock > cantidadActual){
      let cantidadActualizada = cantidadActual + 1;
      carrito[posicionEnArray].cantidad = cantidadActualizada;
       localStorage.setItem('carrito', JSON.stringify(carrito));
       this.carritoSubject.next(carrito);
      }
      else{
        alert ("No hay mas de esta cantidad en existencia")
        return cantidadActual;
      }
  }

  obtenerProductosLocalStorage() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.carrito);
    for(let i = 0; i < this.carrito.length; i++){
      this.subtotal += this.carrito[i].precio * this.carrito[i].cantidad 
    }
    console.log(this.subtotal);
  }

  disminuirCantidadDeProducto(producto:any){
    let carrito = this.obtenerCarrito();
    let posicionEnArray = carrito.findIndex(item => item.nombre === producto.nombre);
      let cantidadActual = carrito[posicionEnArray].cantidad;
      if(cantidadActual === 1){
        return cantidadActual;
      } else{
        let cantidadActualizada = cantidadActual - 1;
        carrito[posicionEnArray].cantidad = cantidadActualizada;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        this.carritoSubject.next(carrito);
      }
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
