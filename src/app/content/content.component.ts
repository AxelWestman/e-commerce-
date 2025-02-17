import { Component, OnInit, OnDestroy, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../carrito.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HttpClientModule, FooterComponent, RouterOutlet, RouterLink, RouterLinkActive, MatCardModule, MatButtonModule, CommonModule, NgxPaginationModule, MatIconModule ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy  {

  public dataSubscription: Subscription | null = null;


  receivedData: any;
  receivedDataArray:any[] = [];

  public page! : number;

  datoPasadoDeServicio = "";



  constructor(private datosService: DatosService, private carritoService: CarritoService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receivedData = params['categoria'];
      this.datosService.getProductosPorCategoria(this.receivedData).subscribe(data => {
        this.receivedDataArray = data.data;
        console.log(this.receivedDataArray);
      });
    });
  

   // Nos suscribimos al Observable para recibir los datos
   /*this.dataSubscription = this.datosService.data$.subscribe(data => {
    if (data !== undefined) {
      this.receivedData = data;  // Asignamos el dato solo si no es undefined
      console.log(this.receivedData);
      localStorage.setItem('nodo', JSON.stringify(this.receivedData));
      this.busquedaNodo();
    } else {
      console.warn('Se ha recibido un dato undefined');
    }
  });
    
  //this.llenarDatos();
  */

  }

  ngOnDestroy() {
    // Es importante cancelar la suscripción cuando el componente se destruye
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log("desuscripto")
    }
  }

  /*busquedaNodo(){
    let prueba = localStorage.getItem('nodo');
      this.datosService.busquedaDatosCategoria(prueba)
    .then(data =>{
      this.receivedDataArray = data;
      console.log(this.receivedDataArray);
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
  }*/

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
   


    /*verProductoDetallado(producto: any){
      this.datosService.productoDetallado(producto);
    }*/

  }

  