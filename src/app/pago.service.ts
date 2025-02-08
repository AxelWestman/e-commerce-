import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {


   getCordobaCiudades= async () => {
    const response = await fetch('/cordobaCiudades.json', {
      method: "get",
    });
    try {
      const data = await response.json();
      // Transforma el array de objetos en un array de nombres
      const nombres = data.map((ciudad: { nombre: any; }) => ciudad.nombre);
      return nombres;
    } catch (err) {
      console.log(err);
      throw err; // Relanza el error para manejarlo en el componente
    }
  }

  constructor(private http: HttpClient) {}
}
