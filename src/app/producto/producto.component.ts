import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';
import {MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit {

  
  
  constructor(private datosService: DatosService, private carritoService: CarritoService ) {}
  
  producto: any;

  ngOnInit() {
    this.recibirProducto();
  } 

  recibirProducto(){
   this.producto = this.datosService.productoParaVer;
   console.log("el producto para ver es" + this.producto.nombre);
  }

}
