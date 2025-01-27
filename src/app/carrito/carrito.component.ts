import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private carritoService: CarritoService
  ) {}
  ngOnInit() {
    this.carritoService.carrito$.subscribe((carrito) => {
      this.carrito = carrito; // Actualizar la vista cuando cambie el carrito
    });
  }

  obtenerProductosLocalStorage() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.carrito);
  }

  limpiarLocalStorage() {
    this.carritoService.eliminarTodo();
  }

  borrarProductoDelCarrito(producto: any) {
    this.carritoService.eliminarProducto(producto);
  }
}
