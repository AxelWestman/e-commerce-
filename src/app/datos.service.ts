import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }

   // Usamos un Subject para emitir los cambios de datos
   private dataSubject = new BehaviorSubject<any>(null);  // Valor inicial definido

   // Observable para que otros componentes puedan suscribirse
   data$ = this.dataSubject.asObservable();

  contenidoParaCargar = "";


  datoParaContenido(data: any){
    if (data !== undefined) {
      this.dataSubject.next(data);  // Solo enviamos datos que no sean undefined
    } else {
      console.warn('Intentando enviar un dato undefined');
    }
  }

}
