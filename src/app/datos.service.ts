import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }


  contenidoParaCargar = "";

  datoParaContenido(parametro: string){
    this.contenidoParaCargar = parametro;
    console.log("El dato pasado es " + this.contenidoParaCargar);
  }

}
