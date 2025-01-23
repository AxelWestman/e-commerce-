import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy  {

  public dataSubscription: Subscription | null = null;


  receivedData: any;
  receivedDataArray:any[] = [];

  datoPasadoDeServicio = "";

  constructor(private datosService: DatosService ) {}

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

}
