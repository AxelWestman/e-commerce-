import { Component, OnInit, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';
import {MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef, } from '@angular/material/snack-bar';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
  

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

  agregarCantidadProducto(producto: any){
    this.carritoService.agregarCantidadDeProducto(producto);
  }

  disminuirCantidadProducto(producto: any){
    this.carritoService.disminuirCantidadDeProducto(producto);
  }

  limpiarLocalStorage() {
    this.carritoService.eliminarTodo();
    this.carritoService.numeroProductosEnCarrito();
    this.openSnackBar();
  }

  borrarProductoDelCarrito(producto: any) {
    this.carritoService.eliminarProducto(producto);
    this.carritoService.numeroProductosEnCarrito();
    this.openSnackBar();
  }
}

    /////////////////////////////////////////////////////////////////
    //         Seccion de snackbard                                          ////
  //////////////////////////////////////////////////////////////////

  @Component({
    selector: 'snack-bar-annotated-component-example-snack',
    standalone: true,
    templateUrl: 'snack-bar-annotated-component-example-snack.html',
    styles: `
      :host {
        display: flex;
      }
  
      .example-pizza-party {
        color: white;
        background-color: #D30000;
        display: flex;
        gap: 30%;
      }
      
      .mdc-snackbar__surface{
        padding-right: 0px;
        background-color: #D30000;
      }
  
    `,
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  })
  export class PizzaPartyAnnotatedComponent {
    snackBarRef = inject(MatSnackBarRef);
  }
