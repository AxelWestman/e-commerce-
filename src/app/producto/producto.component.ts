import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  
  
  constructor(private datosService: DatosService, private carritoService: CarritoService ) {}
  
  producto: any;

  ngOnInit() {
    this.recibirProducto();
  } 

  recibirProducto(){
      if(typeof localStorage !== 'undefined') {
      let prueba = localStorage.getItem('productoparaver');
      this.producto = prueba ? JSON.parse(prueba) : null;
      return this.producto;
      } else {
        // Si localStorage no está disponible, muestra un mensaje de advertencia y devuelve un array vacío
        console.warn('localStorage no está disponible en este entorno.');
        return [];
      }
    }
   //this.producto = this.datosService.productoParaVer;
   //console.log("el producto para ver es" + this.producto.nombre);

   //Agregamos los productos al carrito mediante localstorage
   agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
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
        background-color: #52D452;
        display: flex;
        gap: 30%;
      }
      
      .mdc-snackbar__surface{
        padding-right: 0px;
        background-color: #52D452;
      }
  
    `,
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  })
  export class PizzaPartyAnnotatedComponent {
    snackBarRef = inject(MatSnackBarRef);
  }
