import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url = environment.apiUrl;


  private datos = {
    nombreCliente: '',
  emailCliente: '',
  telefonoCliente: '',
  provinciaCliente: '',
  ciudadCliente: '',
  codigoPostalCliente: '',
  direccionCliente: '',
  internoDeptoCliente: '',
  }

  precioSubtotal: number = 0;

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

  precioSubtotalFunction(valor: number){
    this.precioSubtotal = valor;
  }

  getSantaFeCiudades = async () => {
    const response = await fetch('/santafeCiudades.json', {
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

  getMendozaCiudades = async () => {
    const response = await fetch('/mendozaCiudades.json', {
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

  getTucumanCiudades = async () => {
    const response = await fetch('/tucumanCiudades.json', {
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

  getEntreRiosCiudades = async () => {
    const response = await fetch('/entreriosCiudades.json', {
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

  getSaltaCiudades = async () => {
    const response = await fetch('/saltaCiudades.json', {
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

  getChacoCiudades = async () => {
    const response = await fetch('/chacoCiudades.json', {
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

  getCorrientesCiudades = async () => {
    const response = await fetch('/corrientesCiudades.json', {
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

  getSantiagoDelEsteroCiudades = async () => {
    const response = await fetch('/santiagodelesteroCiudades.json', {
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

  getSanJuanCiudades = async () => {
    const response = await fetch('/sanjuanCiudades.json', {
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

  getJujuyCiudades = async () => {
    const response = await fetch('/jujuyCiudades.json', {
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

  getRioNegroCiudades = async () => {
    const response = await fetch('/rionegroCiudades.json', {
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

  getNeuquenCiudades = async () => {
    const response = await fetch('/neuquenCiudades.json', {
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

  getFormosaCiudades = async () => {
    const response = await fetch('/formosaCiudades.json', {
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

  getChubutCiudades = async () => {
    const response = await fetch('/chubutCiudades.json', {
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

  getSanLuisCiudades = async () => {
    const response = await fetch('/sanluisCiudades.json', {
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

  getCatamarcaCiudades = async () => {
    const response = await fetch('/catamarcaCiudades.json', {
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

  getLaRiojaCiudades = async () => {
    const response = await fetch('/lariojaCiudades.json', {
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

  getLaPampaCiudades = async () => {
    const response = await fetch('/lapampaCiudades.json', {
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

  getSantaCruzCiudades = async () => {
    const response = await fetch('/santacruzCiudades.json', {
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

  getTierraDelFuegoCiudades = async () => {
    const response = await fetch('/tierradelfuegoCiudades.json', {
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

  getMisionesCiudades = async () => {
    const response = await fetch('/misionesCiudades.json', {
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

  datosClienteEnvio = async (data: any) => {
    this.datos = data;
    console.log(this.datos);
    try {
      const response = await fetch(`${this.url}postDatosClienteCompras`, {
        method: 'POST',  // Usamos el método POST
        headers: {
          'Content-Type': 'application/json'  // Especificamos que estamos enviando JSON
        },
        body: JSON.stringify(this.datos)  // Convertimos los datos del producto a JSON
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
  
      const data = await response.json();  // Procesamos la respuesta en formato JSON
      console.log(data);  // Muestra la respuesta del servidor
  
      return data;  // Retorna la respuesta si es necesario
  
    } catch (err) {
      console.log(err);  // Manejamos cualquier error que ocurra
    }
  }

  pedidosPendientes = async (data: any) => {
    this.datos = data;
    console.log(this.datos);
    try {
      const response = await fetch(`${this.url}postComprasPendientes`, {
        method: 'POST',  // Usamos el método POST
        headers: {
          'Content-Type': 'application/json'  // Especificamos que estamos enviando JSON
        },
        body: JSON.stringify(this.datos)  // Convertimos los datos del producto a JSON
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
  
      const data = await response.json();  // Procesamos la respuesta en formato JSON
      console.log(data);  // Muestra la respuesta del servidor
  
      return data;  // Retorna la respuesta si es necesario
  
    } catch (err) {
      console.log(err);  // Manejamos cualquier error que ocurra
    }
  }

}
