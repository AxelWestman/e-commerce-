import { Component, OnInit, OnDestroy, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';
import {MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef, } from '@angular/material/snack-bar';



@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy  {

  public dataSubscription: Subscription | null = null;


  receivedData: any;
  receivedDataArray:any[] = [];

  datoPasadoDeServicio = "";

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  constructor(private datosService: DatosService, private carritoService: CarritoService ) {}

  ngOnInit() {
   
   // Nos suscribimos al Observable para recibir los datos
   this.dataSubscription = this.datosService.data$.subscribe(data => {
    if (data !== undefined) {
      this.receivedData = data;  // Asignamos el dato solo si no es undefined
      console.log(this.receivedData);
      this.datosService.busquedaDatosCategoria(this.receivedData)
    .then(data =>{
      this.receivedDataArray = data;
      console.log(this.receivedDataArray);
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
    } else {
      console.warn('Se ha recibido un dato undefined');
    }
  });

  //this.llenarDatos();
  

  }

  ngOnDestroy() {
    // Es importante cancelar la suscripción cuando el componente se destruye
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log("desuscripto")
    }
  }

  /*llenarDatos(){
    this.datosService.busquedaDatosCategoria(this.receivedData)
    .then(data =>{
      this.receivedDataArray = data;
      console.log(this.receivedDataArray);
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
  }*/

   


    //Agregamos los productos al carrito mediante localstorage
    agregarAlCarrito(producto: any) {
     this.carritoService.agregarProducto(producto);
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