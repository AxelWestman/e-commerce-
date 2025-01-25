import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {

  productosEnCarrito: any[] = [];
  ngOnInit() {
    this.obtenerProductosLocalStorage();
  }

  obtenerProductosLocalStorage(){
    this.productosEnCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.productosEnCarrito);
  }

  limpiarLocalStorage(){
    localStorage.removeItem('carrito');
   console.log('Carrito eliminado');
  }

  borrarProductoDelCarrito(producto: any) {
    if (!producto || !producto.nombre) {
      console.error('El producto no tiene un nombre válido');
      return;
    }
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito = carrito.filter((item: any) => item.nombre !== producto.nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('Producto eliminado del carrito:', producto.nombre);
  }

}
