import { Component, OnInit, OnDestroy} from '@angular/core';
import { DatosService } from '../datos.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy  {

  public dataSubscription: Subscription | null = null;


  receivedData: any;

  datoPasadoDeServicio = "";

  constructor(private datosService: DatosService ) {}

  ngOnInit() {
   
   // Nos suscribimos al Observable para recibir los datos
   this.dataSubscription = this.datosService.data$.subscribe(data => {
    if (data !== undefined) {
      this.receivedData = data;  // Asignamos el dato solo si no es undefined
    } else {
      console.warn('Se ha recibido un dato undefined');
    }
  });
  }

  ngOnDestroy() {
    // Es importante cancelar la suscripción cuando el componente se destruye
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log("desuscripto")
    }
  }



  

}
