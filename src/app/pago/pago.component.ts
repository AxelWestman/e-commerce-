import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PagoService } from '../pago.service';
import { CarritoService } from '../carrito.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; // Importa HttpClientModule

declare var MercadoPago: any; // Declara MercadoPago como una variable global// Declara MercadoPago para TypeScript

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './prueba.html',
  styleUrl: './pago.component.scss',
})
export class PagoComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  mostrarCartel: boolean = false;
  mostrarFormulario: boolean = true;

  preference_id = ''; //Aca se recibe el id de la compora de mercadopago para luego compararlo con la base de datos

  carrito: any[] = [];
  subtotal: number = 0;
  subtotalTarjetas: number= 0;
  subtotalTransferencia: number = 0;
  subtotalEfectivo: number = 0;
  tarjetaDeCredito: boolean = false;



  formaPagoFormControl = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    this.argentinaPhoneValidator,
  ]); // Validación personalizada
  provinciaFormControl = new FormControl('', [Validators.required]);
  ciudadFormControl = new FormControl('', [Validators.required]);
  postalFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{4}$/),
  ]);
  direccionFormControl = new FormControl('', [Validators.required]);

  formaEnvio: string = '';

  firstFormGroup = this._formBuilder.group({
    emailFormControl: ['', [Validators.required, Validators.email]], // Validadores en un array
    phoneNumberFormControl: [
      '',
      [Validators.required, this.argentinaPhoneValidator],
    ], // Validadores en un array
    dniFormControl: ['', [Validators.required, this.argentinaDniValidator()]], // Validadores en un array
    nombreFormControl: ['', [Validators.required]], // Validadores en un array
    formaEnvioFormControl: ['', [Validators.required]],
    direccionSucursal: [''],
    // direccionSucursal:  ['', [Validators.required]],
    provinciaFormControl: ['', [Validators.required]], // Validadores en un array
    ciudadFormControl: ['', [Validators.required]], // Validadores en un array
    postalFormControl: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}$/)],
    ], // Validadores en un array
    direccionFormControl: ['', [Validators.required]], // Validadores en un array
    departamentoFormControl: [''],
  });

  secondFormGroup = this._formBuilder.group({
    formaPagoFormControl: ['', [Validators.required]],
    tarjetaCreditoFormControl: [''],
  });
  isEditable = true;

  onBack() {
    console.log('Botón Back clickeado');
    console.log('Estado del formulario actual:', this.firstFormGroup.valid);
  }

  obtenerProductosLocalStorage() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.carrito);
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].oferta > 0) {
        this.subtotal += this.carrito[i].precio_oferta * this.carrito[i].cantidad;
        this.subtotalTarjetas += this.carrito[i].precio_oferta * this.carrito[i].cantidad;
        this.subtotalTransferencia += this.carrito[i].precio_oferta * this.carrito[i].cantidad;
        this.subtotalEfectivo += this.carrito[i].precio_oferta * this.carrito[i].cantidad;
      } else {
        this.subtotal += this.carrito[i].precio * this.carrito[i].cantidad;
        this.subtotalTarjetas += this.carrito[i].precio * this.carrito[i].cantidad;
        this.subtotalTransferencia += this.carrito[i].precioTransferencia * this.carrito[i].cantidad;
        this.subtotalEfectivo += this.carrito[i].precioEfectivo * this.carrito[i].cantidad;
      }
    }
    console.log(this.subtotal);
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAdvertencia() {
    const dialogRef = this.dialog.open(AdvertenciaContent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formaPago: string = '';

  cordobaCiudadesArray: any[] = [];
  santaFeCiudadesArray: any[] = [];
  mendozaCiudadesArray: any[] = [];
  tucumanCiudadesArray: any[] = [];
  entreRiosCiudadesArray: any[] = [];
  saltaCiudadesArray: any[] = [];
  chacoCiudadesArray: any[] = [];
  corrientesCiudadesArray: any[] = [];
  santiagoDelEsteroCiudadesArray: any[] = [];
  sanJuanCiudadesArray: any[] = [];
  jujuyCiudadesArray: any[] = [];
  rioNegroCiudadesArray: any[] = [];
  neuquenCiudadesArray: any[] = [];
  formosaCiudadesArray: any[] = [];
  chubutCiudadesArray: any[] = [];
  sanLuisCiudadesArray: any[] = [];
  catamarcaCiudadesArray: any[] = [];
  laRiojaCiudadesArray: any[] = [];
  laPampaCiudadesArray: any[] = [];
  santaCruzCiudadesArray: any[] = [];
  tierraDelFuegoCiudadesArray: any[] = [];
  misionesCiudadesArray: any[] = [];

  nombreCliente: any = '';
  emailCliente: any = '';
  telefonoCliente: any = '';
  provinciaCliente: any = '';
  ciudadCliente: any = '';
  codigoPostalCliente: any = '';
  direccionCliente: any = '';
  internoDeptoCliente: any;

  revisionMail: any = '';
  revisionCodigoPostal: any = '';
  revisionNombre: any = '';
  revisionTelefono: any = '';
  revisionDni: any = '';
  revisionEnvio: any = '';
  revisionSucursal: any = '';
  revisionProvincia: any = '';
  revisionCiudad: any = '';
  revisionDireccion: any = '';
  revisionDepto: any = '';
  revisionMetodoPago: any = '';
  revisionCuotas: any = '';

  // Función de validación personalizada para números de teléfono argentinos
  argentinaPhoneValidator(control: AbstractControl) {
    const phoneRegex =
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }

  argentinaDniValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dniRegex = /^\d{7,8}$/; // Expresión regular para 7 u 8 dígitos
      if (control.value && !dniRegex.test(control.value)) {
        return { invalidDNI: true }; // Retorna un error si el DNI no es válido
      }
      return null; // Retorna null si el DNI es válido
    };
  }

  // Lista de provincias de Argentina
  provincias = [
    'Buenos Aires',
    'Córdoba',
    'Santa Fe',
    'Mendoza',
    'Tucumán',
    'Entre Ríos',
    'Salta',
    'Chaco',
    'Corrientes',
    'Santiago del Estero',
    'San Juan',
    'Jujuy',
    'Río Negro',
    'Neuquén',
    'Formosa',
    'Chubut',
    'San Luis',
    'Catamarca',
    'La Rioja',
    'La Pampa',
    'Santa Cruz',
    'Tierra del Fuego',
    'Misiones',
  ];

  metodosEnvio = [
    'Envío a domicilio',
    'Envío a sucursal Correo Argentino',
    'Retiro por showroom',
  ];

  metodosDePago = [
    'Transferencia',
    'Efectivo',
    'Tarjeta de Crédito',
    'Tarjeta de Débito',
  ];
  cantidadDeCuotas = ['1 cuota', '3 cuotas sin interés'];

  // Lista de ciudades (puedes cargarla dinámicamente según la provincia seleccionada)
  ciudades: string[] = [];

  ciudadesDeCordoba() {
    this.pagoService
      .getCordobaCiudades()
      .then((data) => {
        this.cordobaCiudadesArray = [...this.cordobaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }
  ciudadesDeSantaFe() {
    this.pagoService
      .getSantaFeCiudades()
      .then((data) => {
        this.santaFeCiudadesArray = [...this.santaFeCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeMendoza() {
    this.pagoService
      .getMendozaCiudades()
      .then((data) => {
        this.mendozaCiudadesArray = [...this.mendozaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeTucuman() {
    this.pagoService
      .getTucumanCiudades()
      .then((data) => {
        this.tucumanCiudadesArray = [...this.tucumanCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeEntreRios() {
    this.pagoService
      .getEntreRiosCiudades()
      .then((data) => {
        this.entreRiosCiudadesArray = [...this.entreRiosCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeSalta() {
    this.pagoService
      .getSaltaCiudades()
      .then((data) => {
        this.saltaCiudadesArray = [...this.saltaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeChaco() {
    this.pagoService
      .getChacoCiudades()
      .then((data) => {
        this.chacoCiudadesArray = [...this.chacoCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeCorrientes() {
    this.pagoService
      .getCorrientesCiudades()
      .then((data) => {
        this.corrientesCiudadesArray = [
          ...this.corrientesCiudadesArray,
          ...data,
        ];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeSantiagoDelEstero() {
    this.pagoService
      .getSantiagoDelEsteroCiudades()
      .then((data) => {
        this.santiagoDelEsteroCiudadesArray = [
          ...this.santiagoDelEsteroCiudadesArray,
          ...data,
        ];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeSanJuan() {
    this.pagoService
      .getSanJuanCiudades()
      .then((data) => {
        this.sanJuanCiudadesArray = [...this.sanJuanCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeJujuy() {
    this.pagoService
      .getJujuyCiudades()
      .then((data) => {
        this.jujuyCiudadesArray = [...this.jujuyCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeRioNegro() {
    this.pagoService
      .getRioNegroCiudades()
      .then((data) => {
        this.rioNegroCiudadesArray = [...this.rioNegroCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeNeuquen() {
    this.pagoService
      .getNeuquenCiudades()
      .then((data) => {
        this.neuquenCiudadesArray = [...this.neuquenCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeFormosa() {
    this.pagoService
      .getFormosaCiudades()
      .then((data) => {
        this.formosaCiudadesArray = [...this.formosaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeChubut() {
    this.pagoService
      .getChubutCiudades()
      .then((data) => {
        this.chubutCiudadesArray = [...this.chubutCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeSanLuis() {
    this.pagoService
      .getSanLuisCiudades()
      .then((data) => {
        this.sanLuisCiudadesArray = [...this.sanLuisCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeCatamarca() {
    this.pagoService
      .getCatamarcaCiudades()
      .then((data) => {
        this.catamarcaCiudadesArray = [...this.catamarcaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeLaRioja() {
    this.pagoService
      .getLaRiojaCiudades()
      .then((data) => {
        this.laRiojaCiudadesArray = [...this.laRiojaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeLaPampa() {
    this.pagoService
      .getLaPampaCiudades()
      .then((data) => {
        this.laPampaCiudadesArray = [...this.laPampaCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeSantaCruz() {
    this.pagoService
      .getSantaCruzCiudades()
      .then((data) => {
        this.santaCruzCiudadesArray = [...this.santaCruzCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeTierraDelFuego() {
    this.pagoService
      .getTierraDelFuegoCiudades()
      .then((data) => {
        this.tierraDelFuegoCiudadesArray = [
          ...this.tierraDelFuegoCiudadesArray,
          ...data,
        ];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  ciudadesDeMisiones() {
    this.pagoService
      .getMisionesCiudades()
      .then((data) => {
        this.misionesCiudadesArray = [...this.misionesCiudadesArray, ...data];
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }

  // Método para cargar ciudades según la provincia seleccionada
  cargarCiudades(provincia: string) {
    // Aquí puedes cargar las ciudades correspondientes a la provincia seleccionada
    // Por simplicidad, este ejemplo usa una lista estática
    if (provincia === 'Buenos Aires') {
      this.ciudades = [
        'Abasto',
        'Abbott',
        'Acassuso',
        'Acevedo',
        'Adolfo Gonzales Chaves (Est. Chaves)',
        'Adrogue',
        'Aeropuerto Internacional Ezeiza',
        'Aguas Verdes',
        'Agustin Mosconi',
        'Agustin Roca',
        'Agustina',
        'Alberdi Viejo',
        'Alberti (Est. Andres Vaccarezza)',
        'Aldo Bonzi',
        'Alejandro Korn',
        'Alejandro Petion',
        'Alfredo Demarchi (Est. Facundo Quiroga)',
        'Almirante Brown',
        'Altamirano',
        'Alto Los Cardales',
        'Álvarez De Toledo',
        'Alvarez Jonte',
        'America',
        'Andant',
        'Angel Etcheverry',
        'Antonio Carboni',
        'Aparicio',
        'Arana',
        'Arboledas',
        'Área Cinturon Ecologico',
        'Area De Promocion El Triangulo',
        'Arenas Verdes',
        'Arenaza',
        'Argerich',
        'Ariel',
        'Arrecifes',
        'Arribeños',
        'Arroyo Corto',
        'Arroyo De La Cruz',
        'Arroyo Dulce',
        'Arroyo Venado',
        'Arturo Segui',
        'Ascension',
        'Atalaya',
        'Atlantida',
        'Avellaneda',
        'Ayacucho',
        'Azcuenaga',
        'Azopardo',
        'Azul',
        'Bahia Blanca',
        'Bahia San Blas',
        'Baigorrita',
        'Bajo Hondo',
        'Balcarce',
        'Balneario Laguna De Gomez',
        'Balneario Marisol',
        'Balneario Orense',
        'Balneario Pehuen Co',
        'Balneario San Cayetano',
        'Balneario Sauce Grande',
        'Banderalo',
        'Banfield',
        'Baradero',
        'Barker',
        'Barrio America Unida',
        'Barrio Banco Provincia',
        'Barrio Belgrano',
        'Barrio Colinas Verdes',
        'Barrio El Boqueron',
        'Barrio El Carmen (Este)',
        'Barrio El Carmen (Oeste)',
        'Barrio El Casal',
        'Barrio El Coyunco',
        'Barrio El Taladro',
        'Barrio Gambier',
        'Barrio Kennedy',
        'Barrio La Gloria',
        'Barrio Las Casuarinas',
        'Barrio Las Golondrinas',
        'Barrio Las Malvinas',
        'Barrio Las Quintas',
        'Barrio Los Bosquecitos',
        'Barrio Los Pioneros',
        'Barrio Parque Almirante Irizar (Ap. Kilometro 61)',
        'Barrio Parque General San Martin',
        'Barrio Parque Las Acacias',
        'Barrio Rio Salado',
        'Barrio Ruta 24 Kilometro 10',
        'Barrio Saavedra',
        'Barrio Santa Paula',
        'Barrio Santa Rosa',
        'Barrio Universitario',
        'Barrios Lisandro De La Torre Y Santa Marta',
        'Batan',
        'Bayauca',
        'Beccar',
        'Belen De Escobar',
        'Bella Vista',
        'Bellocq',
        'Benavidez',
        'Benito Juarez (Est. Juarez)',
        'Berazategui',
        'Berazategui Oeste',
        'Berdier',
        'Berisso',
        'Bermudez',
        'Bernal',
        'Bernal Oeste',
        'Berutti',
        'Billinghurst',
        'Blancagrande',
        'Blaquier',
        'Bocayuva',
        'Bordenave',
        'Bosques',
        'Boulogne Sur Mer',
        'Bragado',
        'Burzaco',
        'Cabildo',
        'Cachari',
        'Cadret',
        'Camet',
        'Camet Norte',
        'Campana',
        'Campo De Mayo',
        'Campos Salles',
        'Canning',
        'Cañada Seca',
        'Cañuelas',
        'Capilla Del Señor (Est. Capilla)',
        'Capitan Castro',
        'Capitan Sarmiento',
        'Carapachay',
        'Cardenal Cagliero',
        'Carhue',
        'Carilo',
        'Carlos Beguerie',
        'Carlos Casares',
        'Carlos Keen',
        'Carlos Maria Naon',
        'Carlos Salas',
        'Carlos Spegazzini',
        'Carlos Tejedor',
        'Carlos Tomas Sourigues',
        'Carmen De Areco',
        'Carmen De Patagones',
        'Casalins',
        'Casbas',
        'Cascadas',
        'Caseros',
        'Castelar',
        'Castelli',
        'Castilla',
        'Cazon',
        'Centro Guerrero',
        'Chacabuco',
        'Chacras De San Clemente',
        'Chapadmalal',
        'Chascomus',
        'Chascomus Country Club',
        'Chasico',
        'Chiclana',
        'Chillar',
        'Chivilcoy',
        'Churruca',
        'City Bell',
        'Ciudad Evita',
        'Ciudad Jardin El Libertador',
        'Ciudad Jardin Lomas Del Palomar',
        'Ciudadela',
        'Claraz',
        'Claromeco',
        'Claypole',
        'Club De Campo Larena - Los Quinchos',
        'Colon',
        'Colonia Hinojo',
        'Colonia Mauricio',
        'Colonia Nievas',
        'Colonia San Adolfo',
        'Colonia San Martin',
        'Colonia San Miguel',
        'Colonia San Miguel Arcangel',
        'Colonia San Ricardo (Est. Iriarte)',
        'Colonia Sere',
        'Comandante Nicanor Otamendi',
        'Comodoro Py',
        'Conesa',
        'Copetonas',
        'Coronel Boerr',
        'Coronel Brandsen',
        'Coronel Charlone',
        'Coronel Dorrego',
        'Coronel Martinez De Hoz (Ap. Kilometro 322)',
        'Coronel Pringles (Est. Pringles)',
        'Coronel Segui',
        'Coronel Suarez',
        'Coronel Vidal',
        'Cortines',
        'Costa Bonita',
        'Country Club Bosque Real - Barrio Morabo',
        'Country Club El Casco',
        'Country Club El JagÜEL',
        'Country Club El Rodeo',
        'Country Club Las Praderas',
        'Country Los Medanos',
        'Crotto',
        'Crucesita',
        'Cuartel V',
        'Cucullu',
        'Cura Malal',
        'Curaru',
        'Daireaux',
        'Darregueira',
        'De Bary',
        'De La Canal',
        'De La Garma',
        'Del Carril',
        'Del Valle',
        'Del Viso',
        'Delfin Huergo',
        'Desvio Aguirre',
        'Diego Gaynor',
        'Dique Lujan',
        'Dique N 1',
        'Dock Sud',
        'Dolores',
        'Domselaar',
        'Don Bosco',
        'Don Orione',
        'Don Torcuato Este',
        'Don Torcuato Oeste',
        "D'Orbigny",
        'Dudignac',
        'Dufaur',
        'Duggan',
        'Dunamar',
        'El Arbolito',
        'El Cazador',
        'El Divisorio',
        'El Dorado',
        'El JagÜEL',
        'El Libertador',
        'El Marquesado',
        'El Palomar',
        'El Paraiso',
        'El Pato',
        'El Pensamiento',
        'El Perdido (Est. Jose A. Guisasola)',
        'El Remanso',
        'El Retiro',
        'El Talar',
        'El Trigo',
        'El Triunfo',
        'Elvira',
        'Emilio Ayarza',
        'Emilio V. Bunge',
        'Ensenada',
        'Erezcano',
        'Ernestina',
        'Escalada',
        'Escobar',
        'Espartillar',
        'Espigas',
        'Estacion Arenales',
        'Estacion Camet',
        'Estacion Chapadmalal',
        'Estanislao Severo Zeballos',
        'Esteban Agustin Gascon',
        'Esteban Echeverria',
        'Estela',
        'Ezpeleta',
        'Ezpeleta Oeste',
        'Faro',
        'Fatima',
        'Felipe Sola',
        'Ferre',
        'Florencio Varela',
        'Florentino Ameghino',
        'Florida',
        'Florida Oeste',
        'Fontezuela',
        'Fortin Acha',
        'Fortin Olavarria',
        'Fortin Tiburcio',
        'Francisco Alvarez',
        'Francisco Madero',
        'Franklin',
        'Frente Mar',
        'Gahan',
        'Gardey',
        'Garin',
        'Garre',
        'General Alvear',
        'General Arenales',
        'General Belgrano',
        'General Conesa',
        'General Daniel Cerri (Est. General Cerri)',
        'General Guido',
        'General Hornos',
        'General Juan Madariaga',
        'General La Madrid',
        'General Las Heras (Est. Las Heras)',
        'General Lavalle',
        'General Mansilla (Est. Bartolome Bavio)',
        "General O'Brien",
        'General Pacheco',
        'General Pinto',
        'General Piran',
        'General Rivas',
        'General Rodriguez',
        'General Rojo',
        'General San Martin',
        'General Villegas (Est. Villegas)',
        'Gerli',
        'Germania (Est. Mayor Jose Orellano)',
        'Girodias',
        'Glew',
        'Gobernador Castro',
        'Gobernador Julio A. Costa',
        'Gobernador Udaondo',
        'Gobernador Ugarte',
        'Gomez',
        'Gonzalez Catan',
        'Gonzalez Moreno',
        'Gorchs',
        'Gorostiaga',
        'Gowland',
        'Goyena',
        'Grand Bourg',
        'Gregorio De Laferrere',
        'GrÜNBEIN',
        'Guamini',
        'Guernica',
        'Guerrico',
        'Guillermo Enrique Hudson',
        'Haedo',
        'Hale',
        'Henderson',
        'Herrera Vegas',
        'Hilario Ascasubi',
        'Hinojo',
        'Hortensia',
        'Huanguelen',
        'Hurlingham',
        'Ignacio Correas',
        'Indio Rico',
        'Ines Indart',
        'Ingeniero Adolfo Sourdeaux',
        'Ingeniero Juan Allan',
        'Ingeniero Maschwitz',
        'Ingeniero Pablo Nogues',
        'Ingeniero Thompson',
        'Ingeniero White',
        'Irala',
        'Irene',
        'Irineo Portela',
        'Isidro Casanova',
        'Isla Santiago (Oeste)',
        'Ituzaingo Centro',
        'Ituzaingo Sur',
        'Jeppener',
        'Joaquin Gorina',
        'Jose B. Casas',
        'Jose C. Paz',
        'Jose Hernandez',
        'Jose Ingenieros',
        'Jose Juan Almeyra',
        'Jose Maria Ezeiza',
        'Jose Maria Jauregui (Est. Jauregui)',
        'Jose Marmol',
        'Jose Melchor Romero',
        'Juan A. De La Peña',
        'Juan A. Pradere',
        'Juan Anchorena (Est. Urquiza)',
        'Juan Bautista Alberdi (Est. Alberdi)',
        'Juan Couste (Est. Algarrobo)',
        'Juan E. Barra',
        'Juan F. Ibarra',
        'Juan Jose Paso',
        'Juan Maria Gutierrez',
        'Juan N. Fernandez',
        'Junin',
        'La Angelita',
        'La Armonia',
        'La Aurora (Est. La Niña)',
        'La Baliza',
        'La Beba',
        'La Caleta',
        'La Capilla',
        'La Carreta',
        'La Choza',
        'La Colina',
        'La Constancia',
        'La Cumbre',
        'La Delfina',
        'La Emilia',
        'La Invencible',
        'La Larga',
        'La Limpia',
        'La Lonja',
        'La Lucila',
        'La Luisa',
        'La Manuela',
        'La Matanza',
        'La Pala',
        'La Plata',
        'La Reja',
        'La Rica',
        'La Sofia',
        'La Tablada',
        'La Trinidad',
        'La Union',
        'La Violeta',
        'Labarden',
        'Laguna Alsina (Est. Bonifacio)',
        'Laguna De Lobos',
        'Lanus Este',
        'Lanus Oeste',
        'Laplacette',
        'Laprida',
        'Lartigau',
        'Las Armas',
        'Las Bahamas',
        'Las Carabelas',
        'Las Flores',
        'Las Marianas',
        'Las Martinetas',
        'Las Tahonas',
        'Las Toninas',
        'Las Toscas',
        'Leandro N. Alem',
        'Lezica Y Torrezuri',
        'Libano',
        'Libertad',
        'Licenciado Matienzo',
        'Lima',
        'Lin Calel',
        'Lincoln',
        'Lisandro Olmos',
        'Llavallol',
        'Loberia',
        'Lobos',
        'Loma Hermosa',
        'Loma Verde',
        'Lomas De Copello',
        'Lomas De Zamora',
        'Lomas Del Mirador',
        'Lomas Del Rio Lujan (Est. Rio Lujan)',
        'Longchamps',
        'Lopez',
        'Lopez Lecube',
        'Los Angeles',
        'Los Cachorros',
        'Los Cardales',
        'Los Hornos',
        'Los Indios',
        'Los Naranjos',
        'Los Pinos',
        'Los Polvorines',
        'Los Talas',
        'Los Toldos',
        'Los Troncos Del Talar',
        'Lozano',
        'Lucas Monteverde',
        'Lucila Del Mar',
        'Luis Guillon',
        'Lujan',
        'Magdala',
        'Magdalena',
        'Maipu',
        'Malvinas Argentinas',
        'Manuel B. Gonnet',
        'Manuel J. Cobo (Est. Lezama)',
        'Manuel Ocampo',
        'Manzanares',
        'Manzone',
        'Maquinista F. Savio Este',
        'Maquinista F. Savio Oeste',
        'Mar Azul',
        'Mar Chiquita',
        'Mar De Ajo',
        'Mar De Ajo Norte',
        'Mar De Cobo',
        'Mar De Las Pampas',
        'Mar Del Plata',
        'Mar Del Sur',
        'Mar Del Tuyu',
        'Marcelino Ugarte (Est. Dennehy)',
        'Marcos Paz',
        'Maria Ignacia (Est. Vela)',
        'Mariano Acosta',
        'Mariano Benitez',
        'Mariano H. Alfonzo (Est. San Patricio)',
        'Mariano Unzue',
        'Martin Coronado',
        'Martinez',
        'Massey (Est. Elordi)',
        'Matheu',
        'Mauricio Hirsch',
        'Maximo Fernandez (Est. Juan F. Salaberry)',
        'Maximo Paz',
        'Mayor Buratovich',
        'Maza',
        'Mechita',
        'Mechongue',
        'Medanos',
        'Mercedes',
        'Merlo',
        'Micaela Cascallares (Est. Cascallares)',
        'Ministro Rivadavia',
        'Mira Pampa',
        'Miramar',
        'Moctezuma',
        'Mones Cazon',
        'Monte Chingolo',
        'Monte Grande',
        'Monte Hermoso',
        'Moquehua',
        'Morea',
        'Moreno',
        'Moron',
        'Morse',
        'Munro',
        'Muñiz',
        'Napaleofu',
        'Navarro',
        'Necochea',
        'Nicanor Olivera (Est. La Dulce)',
        'Norberto De La Riestra',
        'Norumbega',
        'Nueva Plata',
        'Obligado',
        'Ochandio',
        "O'Higgins",
        'Olascoaga',
        'Olavarria',
        'Oliden',
        'Olivera',
        'Olivos',
        'Open Door',
        'Ordoqui',
        'Orense',
        'Oriente',
        'Ostende',
        'Pablo Podesta',
        'Parada Orlando',
        'Parada Robles',
        'Parada Robles - Pavon',
        'Pardo',
        'Pasman',
        'Paso Del Rey',
        'Pasteur',
        'Patricios',
        'Paula',
        'Pavon',
        'Pearson',
        'Pedernales',
        'Pedro Luro',
        'Pehuajo',
        'Pellegrini',
        'Pereyra',
        'Perez Millan',
        'Pergamino',
        'Pichincha',
        'Piedritas',
        'Pieres',
        'PigÜE',
        'Pila',
        'Pilar',
        'Pinamar',
        'Pinzon',
        'Piñeyro',
        'Pipinas',
        'Pirovano',
        'Pla',
        'Platanos',
        'Playa Dorada',
        'Plomer',
        'Polvaredas',
        'Pontaut',
        'Pontevedra',
        'Porvenir',
        'Presidente Derqui',
        'Presidente Peron',
        'Puan',
        'Pueblo Doyle',
        'Pueblo Gouin',
        'Pueblo Nuevo',
        'Pueblo San Jorge',
        'Puerto Parana',
        'Punta Alta (Est. Almirante Solier)',
        'Punta Indio',
        'Punta Lara',
        'Punta Mogotes',
        'Quenuma',
        'Quequen',
        'Quilmes',
        'Quilmes Oeste',
        'Rafael Calzada',
        'Rafael Castillo',
        'Rafael Obligado',
        'Ramallo',
        'Ramon Biaus',
        'Ramon Santamarina',
        'Ramos Mejia',
        'Ramos Otero',
        'Rancagua',
        'Ranchos',
        'Ranelagh',
        'Rauch',
        'Rawson',
        'Recalde',
        'Remedios De Escalada',
        'Remedios Escalada De San Martin',
        'Reta',
        'Ricardo Rojas',
        'Rincon De Milberg',
        'Ringuelet',
        'Rio Tala',
        'Rivera',
        'Roberto Cano',
        'Roberto De Vicenzo',
        'Roberto J. Payro',
        'Roberts',
        'Rojas',
        'Roosevelt',
        'Roque Perez',
        'Rufino De Elizalde',
        'Ruta Sol',
        'Saavedra',
        'Saenz Peña',
        'Saforcada',
        'Saladillo',
        'Salazar',
        'Saldungaray',
        'Salliquelo',
        'Salto',
        'Salvador Maria',
        'Samborombon',
        'San Agustin',
        'San Andres De Giles',
        'San Antonio De Areco',
        'San Antonio De Padua',
        'San Bernardo',
        'San Bernardo (Est. Guanaco)',
        'San Carlos De Bolivar (Est. Bolivar)',
        'San Cayetano',
        'San Clemente Del Tuyu',
        'San Emilio',
        'San Enrique',
        'San Fernando',
        'San Francisco De Bellocq',
        'San Francisco Solano',
        'San Francisco Solano',
        'San German',
        'San Isidro',
        'San Jose',
        'San Jose',
        'San Justo',
        'San Manuel',
        'San Mauricio',
        'San Mayol',
        'San Miguel',
        'San Miguel Del Monte (Est. Monte)',
        'San Nicolas De Los Arroyos',
        'San Pedro',
        'San Roman',
        'San Sebastian',
        'San Vicente',
        'Sansinena',
        'Santa Clara Del Mar',
        'Santa Coloma',
        'Santa Elena',
        'Santa Eleodora',
        'Santa Lucia',
        'Santa Luisa',
        'Santa Maria',
        'Santa Regina',
        'Santa Rosa',
        'Santa Teresa',
        'Santa Teresita',
        'Santa Trinidad',
        'Santo Domingo',
        'Santos Lugares',
        'Sarandi',
        'Sarasa',
        'Sevigne',
        'Sierra Chica',
        'Sierra De La Ventana',
        'Sierra De Los Padres',
        'Sierras Bayas',
        'Smith',
        'Sol De Mayo',
        'Solanet',
        'Solis',
        'Stroeder',
        'Suipacha',
        'Sundblad',
        'Tamangueyu',
        'Tandil',
        'Tapalque',
        'Tapiales',
        'Tedin Uriburu',
        'Temperley',
        'Teniente Origone',
        'Thames',
        'Tigre',
        'Timote',
        'Todd',
        'Tolosa',
        'Tomas Jofre',
        'Tornquist',
        'Torres',
        'Tortuguitas',
        'Tortuguitas',
        'Tortuguitas',
        'Transradio',
        'Trenque Lauquen',
        'Tres Algarrobos (Est. Cuenca)',
        'Tres Arroyos',
        'Tres De Febrero',
        'Tres Lomas',
        'Tres Picos',
        'Tres Sargentos',
        'Tres Lomas',
        'Trujui',
        'Turdera',
        'Udaquiola',
        'Urdampilleta',
        'Uribelarrea',
        'Valdes',
        'Valentin Alsina',
        'Valeria Del Mar',
        'Vasquez',
        'Vedia',
        'Velloso',
        'Veronica',
        'Vicente Casares',
        'Vicente Lopez',
        'Victoria',
        'Vieytes',
        'Villa Eduardo Madero',
        'Villa Adelina',
        'Villa Adelina',
        'Villa Alfredo Fortabat',
        'Villa Alsina (Est. Alsina)',
        'Villa Angelica (Est. El Socorro)',
        'Villa ArgÜELLO',
        'Villa Arrieta',
        'Villa Astolfi',
        'Villa Ayacucho',
        'Villa Ballester',
        'Villa Bernardo Monteagudo',
        'Villa Bordeau',
        'Villa Bosch (Est. Juan Maria Bosch)',
        'Villa Brown',
        'Villa Cacique (Est. Alfredo Fortabat)',
        'Villa Campi',
        'Villa Canto',
        'Villa Castelar (Est. Erize)',
        'Villa Catela',
        'Villa Centenario',
        'Villa Chacabuco',
        'Villa Coronel Jose M. Zapiola',
        'Villa De Mayo',
        'Villa Del Mar',
        'Villa Dolores',
        'Villa Dominico',
        'Villa Elisa',
        'Villa Elvira',
        'Villa España',
        'Villa Esperanza',
        'Villa Espil',
        'Villa Espora',
        'Villa Fiorito',
        'Villa Flandria Norte',
        'Villa Flandria Sur',
        'Villa Francia (Est. Coronel Granada)',
        'Villa Garibaldi',
        'Villa General Antonio J. De Sucre',
        'Villa General Arias (Est. Kilometro 638)',
        'Villa General Eugenio Necochea',
        'Villa General Fournier (Est. 9 De Julio Sud)',
        'Villa General Jose Tomas Guido',
        'Villa General Juan G. Las Heras',
        'Villa General Savio (Est. Sanchez)',
        'Villa Gesell',
        'Villa Gobernador Udaondo',
        'Villa Godoy Cruz',
        'Villa Granaderos De San Martin',
        'Villa Gregoria Matorras',
        'Villa Grisolia (Est. Achupallas)',
        'Villa Hermosa',
        'Villa Independencia',
        'Villa Iris',
        'Villa Jose Leon Suarez',
        'Villa Juan Martin De Pueyrredon',
        'Villa La Arcadia',
        'Villa La Florida',
        'Villa La Serrania',
        'Villa Laguna La Brava',
        'Villa Las Encadenadas',
        'Villa Lia',
        'Villa Libertad',
        'Villa Luzuriaga',
        'Villa Lynch',
        'Villa Lynch Pueyrredon',
        'Villa Maipu',
        'Villa Manuel Pomar',
        'Villa Margarita',
        'Villa Maria',
        'Villa Maria Irene De Los Remedios De Escalada',
        'Villa Marques Alejandro Maria De Aguado',
        'Villa Martelli',
        'Villa Moll (Est. Moll)',
        'Villa Montoro',
        'Villa Nueva',
        'Villa Ortiz (Est. Coronel Mom)',
        'Villa Parque Cecir',
        'Villa Parque Girado',
        'Villa Parque Presidente Figueroa Alcorta',
        'Villa Parque San Lorenzo',
        'Villa Parque Sicardi',
        'Villa Porteña',
        'Villa Progreso',
        'Villa Raffo',
        'Villa Ramallo',
        'Villa Riccio',
        'Villa Roch',
        'Villa Rodriguez (Est. Barrow)',
        'Villa Rosa',
        'Villa Roth (Est. Ingeniero Balbin)',
        'Villa Ruiz',
        'Villa Saboya',
        'Villa San Andres',
        'Villa San Carlos',
        'Villa San Jose',
        'Villa San Luis',
        'Villa Santa Rosa',
        'Villa Santos Tesei',
        'Villa Sarmiento',
        'Villa Sauze',
        'Villa Serrana La Gruta',
        'Villa Vatteone',
        'Villa Ventana',
        'Villa Yapeyu',
        'Villa Zula',
        'Villalonga',
        'Villanueva (Ap. Rio Salado)',
        'Villars',
        'Viña',
        'Virrey Del Pino',
        'Virreyes',
        'Vivorata',
        'Warnes',
        'Wilde',
        'William C. Morris',
        'Yutuyaco',
        'Zarate',
        'Zavalia',
        'Zelaya',
        'Zenon Videla Dorna',
        'Zona Aeropuerto Internacional Ezeiza',
        '11 De Septiembre',
        '12 De Octubre',
        '16 De Julio',
        '17 De Agosto',
        '20 De Junio',
        '25 De Mayo',
        '30 De Agosto',
        '9 De Abril',
        '9 De Julio',
      ];
    } else if (provincia === 'Córdoba') {
      this.ciudades = this.cordobaCiudadesArray;
    } else if (provincia === 'Santa Fe') {
      this.ciudades = this.santaFeCiudadesArray;
    } else if (provincia === 'Mendoza') {
      this.ciudades = this.mendozaCiudadesArray;
    } else if (provincia === 'Tucumán') {
      this.ciudades = this.tucumanCiudadesArray;
    } else if (provincia === 'Entre Ríos') {
      this.ciudades = this.entreRiosCiudadesArray;
    } else if (provincia === 'Salta') {
      this.ciudades = this.saltaCiudadesArray;
    } else if (provincia === 'Chaco') {
      this.ciudades = this.chacoCiudadesArray;
    } else if (provincia === 'Corrientes') {
      this.ciudades = this.corrientesCiudadesArray;
    } else if (provincia === 'Santiago del Estero') {
      this.ciudades = this.santiagoDelEsteroCiudadesArray;
    } else if (provincia === 'San Juan') {
      this.ciudades = this.sanJuanCiudadesArray;
    } else if (provincia === 'Jujuy') {
      this.ciudades = this.jujuyCiudadesArray;
    } else if (provincia === 'Río Negro') {
      this.ciudades = this.rioNegroCiudadesArray;
    } else if (provincia === 'Neuquén') {
      this.ciudades = this.neuquenCiudadesArray;
    } else if (provincia === 'Formosa') {
      this.ciudades = this.formosaCiudadesArray;
    } else if (provincia === 'Chubut') {
      this.ciudades = this.chubutCiudadesArray;
    } else if (provincia === 'San Luis') {
      this.ciudades = this.sanLuisCiudadesArray;
    } else if (provincia === 'Catamarca') {
      this.ciudades = this.catamarcaCiudadesArray;
    } else if (provincia === 'La Rioja') {
      this.ciudades = this.laRiojaCiudadesArray;
    } else if (provincia === 'La Pampa') {
      this.ciudades = this.laPampaCiudadesArray;
    } else if (provincia === 'Santa Cruz') {
      this.ciudades = this.santaCruzCiudadesArray;
    } else if (provincia === 'Tierra del Fuego') {
      this.ciudades = this.tierraDelFuegoCiudadesArray;
    } else if (provincia === 'Misiones') {
      this.ciudades = this.misionesCiudadesArray;
    } else {
      this.ciudades = [];
    }
    this.ciudadFormControl.reset(); // Reinicia el campo de ciudad al cambiar la provincia
  }

  cargarFormasDeEnvio(envio: string) {
    if (envio === 'Envío a domicilio') {
      this.formaEnvio = 'Envío a domicilio';
      let direccionSucursalControl =
        this.firstFormGroup.get('direccionSucursal');
      if (direccionSucursalControl) {
        this.revisionSucursal = '';
        direccionSucursalControl.clearValidators();
        direccionSucursalControl.updateValueAndValidity(); // Actualiza el estado del control
      }
    } else if (envio === 'Envío a sucursal Correo Argentino') {
      this.formaEnvio = 'Envío a sucursal Correo Argentino';
      let direccionSucursalControl =
        this.firstFormGroup.get('direccionSucursal');
      if (direccionSucursalControl) {
        direccionSucursalControl.setValidators([Validators.required]);
        direccionSucursalControl.updateValueAndValidity(); // Actualiza el estado del control
      }
    } else if (envio === 'Retiro por showroom') {
      this.formaEnvio = 'Retiro por showroom';
      let direccionSucursalControl =
        this.firstFormGroup.get('direccionSucursal');
      if (direccionSucursalControl) {
        this.revisionSucursal = '';
        direccionSucursalControl.clearValidators();
        direccionSucursalControl.updateValueAndValidity(); // Actualiza el estado del control
      }
    }
  }

  formaDePago(pago: string) {
    if (pago === 'Transferencia') {
      this.formaPago = 'Transferencia';
      this.subtotal = this.subtotalTransferencia;
      //alert("El subtotal cambio a" + this.subtotal)
      this.tarjetaDeCredito = false;
      let tarjetaCreditoControl = this.secondFormGroup.get(
        'tarjetaCreditoFormControl'
      );
      if (tarjetaCreditoControl) {
        this.revisionCuotas = '';
        tarjetaCreditoControl.clearValidators();
        tarjetaCreditoControl.updateValueAndValidity();
      }
    }
    else if (pago === 'Efectivo') {
      this.formaPago = 'Efectivo';
      this.subtotal = this.subtotalEfectivo;
      // alert("El subtotal cambio a" + this.subtotal)
      this.tarjetaDeCredito = false;
      let tarjetaCreditoControl = this.secondFormGroup.get(
        'tarjetaCreditoFormControl'
      );
      if (tarjetaCreditoControl) {
        this.revisionCuotas = '';
        tarjetaCreditoControl.clearValidators();
        tarjetaCreditoControl.updateValueAndValidity();
      }
    }
    else if (pago === 'Tarjeta de Crédito') {
      this.formaPago = 'Tarjeta de Crédito';
      this.subtotal = this.subtotalTarjetas;
      this.tarjetaDeCredito = true;
      let tarjetaCreditoControl = this.secondFormGroup.get(
        'tarjetaCreditoFormControl'
      );
      if (tarjetaCreditoControl) {
        tarjetaCreditoControl.setValidators([Validators.required]);
        tarjetaCreditoControl.updateValueAndValidity();
      }
    } else if (pago === 'Tarjeta de Débito') {
      this.formaPago = 'Tarjeta de Débito';
      this.subtotal = this.subtotalTarjetas;
      this.tarjetaDeCredito = false;
      let tarjetaCreditoControl = this.secondFormGroup.get(
        'tarjetaCreditoFormControl'
      );
      if (tarjetaCreditoControl) {
        this.revisionCuotas = '';
        tarjetaCreditoControl.clearValidators();
        tarjetaCreditoControl.updateValueAndValidity();
      }
    }
  }

  cantidadCuotas(cuotas: string) {}

  ngOnInit() {
    this.ciudadesDeCordoba();
    this.ciudadesDeSantaFe();
    this.ciudadesDeMendoza();
    this.ciudadesDeTucuman();
    this.ciudadesDeEntreRios();
    this.ciudadesDeSalta();
    this.ciudadesDeChaco();
    this.ciudadesDeCorrientes();
    this.ciudadesDeSantiagoDelEstero();
    this.ciudadesDeSanJuan();
    this.ciudadesDeJujuy();
    this.ciudadesDeRioNegro();
    this.ciudadesDeNeuquen();
    this.ciudadesDeFormosa();
    this.ciudadesDeChubut();
    this.ciudadesDeSanLuis();
    this.ciudadesDeCatamarca();
    this.ciudadesDeLaRioja();
    this.ciudadesDeLaPampa();
    this.ciudadesDeSantaCruz();
    this.ciudadesDeTierraDelFuego();
    this.ciudadesDeMisiones();
    this.obtenerProductosLocalStorage();
    this.openAdvertencia();
  }

  constructor(
    private pagoService: PagoService,
    private carritoService: CarritoService,
    private http: HttpClient
  ) {}

  revisionDatos() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };

      this.revisionMail = formData.emailFormControl;
      this.revisionCodigoPostal = formData.postalFormControl;
      this.revisionNombre = formData.nombreFormControl;
      this.revisionTelefono = formData.phoneNumberFormControl;
      this.revisionDni = formData.dniFormControl;
      this.revisionEnvio = formData.formaEnvioFormControl;
      this.revisionSucursal = formData.direccionSucursal;
      this.revisionProvincia = formData.provinciaFormControl;
      this.revisionCiudad = formData.ciudadFormControl;
      this.revisionDireccion = formData.direccionFormControl;
      this.revisionDepto = formData.departamentoFormControl;
      this.revisionMetodoPago = formData.formaPagoFormControl;
      this.revisionCuotas = formData.tarjetaCreditoFormControl;
    }
  }

  pagoMercadoPagoDebito(carrito: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const mp = new MercadoPago('TEST-4b2851e9-7cdc-4444-9091-b2816f1a8bf0', {
        locale: 'es-AR',
      });

      // Preparar los items del carrito para MercadoPago
      console.log(carrito);
      const items = carrito.map((producto: any) => ({
        title: producto.nombre,
        quantity: producto.cantidad,
        unit_price:
          producto.oferta > 0 ? producto.precio_oferta : producto.precio,
      }));

      console.log(items);

      this.http
        .post('http://192.168.0.163:3000/create-order', {
          items: items, // Enviar los items del carrito
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.preference_id = response.id;
            const initPoint = response.init_point;
            console.log('initPoint:', initPoint);

            // Abrir el init_point en una nueva ventana
            if (initPoint) {
              const nuevaVentana = window.open(initPoint, '_blank');

              // Verificar si la ventana se abrió correctamente
              if (!nuevaVentana) {
                reject(new Error('No se pudo abrir la ventana de pago.'));
                return;
              }

              // Verificar el estado del pago cada segundo
              const verificarPago = setInterval(() => {
                this.http
                  .get(
                    `http://192.168.0.163:3000/obtener-id-compra/${this.preference_id}`
                  )
                  .subscribe(
                    (paymentResponse: any) => {
                      console.log(paymentResponse);
                      const paymentStatus = paymentResponse.data[0].status;
                      console.log(paymentStatus);
                      console.log('Estado del pago:', paymentStatus);

                      if (paymentStatus === 'approved') {
                        clearInterval(verificarPago); // Detener la verificación
                        resolve(); // Pago exitoso
                      } else if (
                        paymentStatus === 'rejected' ||
                        paymentStatus === 'cancelled'
                      ) {
                        clearInterval(verificarPago); // Detener la verificación
                        reject(
                          new Error(
                            `El pago no fue aprobado. Estado: ${paymentStatus}`
                          )
                        );
                      }
                      // Si el estado sigue siendo "pending", no hacemos nada y seguimos verificando
                    },
                    (error) => {
                      clearInterval(verificarPago); // Detener la verificación en caso de error
                      reject(
                        new Error('Error al verificar el estado del pago.')
                      );
                    }
                  );
              }, 1000); // Verificar cada segundo
            } else {
              reject(new Error('No se recibió un init_point válido.'));
            }
          },
          (error) => {
            reject(new Error('Error en la solicitud: ' + error.message));
          }
        );
    });
  }

  pagoMercadoPagoCredito(carrito: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const mp = new MercadoPago('TEST-4b2851e9-7cdc-4444-9091-b2816f1a8bf0', {
        locale: 'es-AR',
      });

      // Preparar los items del carrito para MercadoPago
      console.log(carrito);
      const items = carrito.map((producto: any) => ({
        title: producto.nombre,
        quantity: producto.cantidad,
        unit_price:
          producto.oferta > 0 ? producto.precio_oferta : producto.precio,
      }));

      console.log(items);

      this.http
        .post('http://192.168.0.163:3000/create-order-una-cuota', {
          items: items, // Enviar los items del carrito
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.preference_id = response.id;
            const initPoint = response.init_point;
            console.log('initPoint:', initPoint);

            // Abrir el init_point en una nueva ventana
            if (initPoint) {
              const nuevaVentana = window.open(initPoint, '_blank');

              // Verificar si la ventana se abrió correctamente
              if (!nuevaVentana) {
                reject(new Error('No se pudo abrir la ventana de pago.'));
                return;
              }

              // Verificar el estado del pago cada segundo
              const verificarPago = setInterval(() => {
                this.http
                  .get(
                    `http://192.168.0.163:3000/obtener-id-compra/${this.preference_id}`
                  )
                  .subscribe(
                    (paymentResponse: any) => {
                      console.log(paymentResponse);
                      const paymentStatus = paymentResponse.data[0].status;
                      console.log(paymentStatus);
                      console.log('Estado del pago:', paymentStatus);

                      if (paymentStatus === 'approved') {
                        clearInterval(verificarPago); // Detener la verificación
                        resolve(); // Pago exitoso
                      } else if (
                        paymentStatus === 'rejected' ||
                        paymentStatus === 'cancelled'
                      ) {
                        clearInterval(verificarPago); // Detener la verificación
                        reject(
                          new Error(
                            `El pago no fue aprobado. Estado: ${paymentStatus}`
                          )
                        );
                      }
                      // Si el estado sigue siendo "pending", no hacemos nada y seguimos verificando
                    },
                    (error) => {
                      clearInterval(verificarPago); // Detener la verificación en caso de error
                      reject(
                        new Error('Error al verificar el estado del pago.')
                      );
                    }
                  );
              }, 1000); // Verificar cada segundo
            } else {
              reject(new Error('No se recibió un init_point válido.'));
            }
          },
          (error) => {
            reject(new Error('Error en la solicitud: ' + error.message));
          }
        );
    });
  }

  pagoMercadoPagoCreditoTresCuotas(carrito: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const mp = new MercadoPago('TEST-4b2851e9-7cdc-4444-9091-b2816f1a8bf0', {
        locale: 'es-AR',
      });

      // Preparar los items del carrito para MercadoPago
      console.log(carrito);
      const items = carrito.map((producto: any) => ({
        title: producto.nombre,
        quantity: producto.cantidad,
        unit_price:
          producto.oferta > 0 ? producto.precio_oferta : producto.precio,
      }));

      console.log(items);

      this.http
        .post('http://192.168.0.163:3000/create-order-tres-cuotas', {
          items: items, // Enviar los items del carrito
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.preference_id = response.id;
            const initPoint = response.init_point;
            console.log('initPoint:', initPoint);

            // Abrir el init_point en una nueva ventana
            if (initPoint) {
              const nuevaVentana = window.open(initPoint, '_blank');

              // Verificar si la ventana se abrió correctamente
              if (!nuevaVentana) {
                reject(new Error('No se pudo abrir la ventana de pago.'));
                return;
              }

              // Verificar el estado del pago cada segundo
              const verificarPago = setInterval(() => {
                this.http
                  .get(
                    `http://192.168.0.163:3000/obtener-id-compra/${this.preference_id}`
                  )
                  .subscribe(
                    (paymentResponse: any) => {
                      console.log(paymentResponse);
                      const paymentStatus = paymentResponse.data[0].status;
                      console.log(paymentStatus);
                      console.log('Estado del pago:', paymentStatus);

                      if (paymentStatus === 'approved') {
                        clearInterval(verificarPago); // Detener la verificación
                        resolve(); // Pago exitoso
                      } else if (
                        paymentStatus === 'rejected' ||
                        paymentStatus === 'cancelled'
                      ) {
                        clearInterval(verificarPago); // Detener la verificación
                        reject(
                          new Error(
                            `El pago no fue aprobado. Estado: ${paymentStatus}`
                          )
                        );
                      }
                      // Si el estado sigue siendo "pending", no hacemos nada y seguimos verificando
                    },
                    (error) => {
                      clearInterval(verificarPago); // Detener la verificación en caso de error
                      reject(
                        new Error('Error al verificar el estado del pago.')
                      );
                    }
                  );
              }, 1000); // Verificar cada segundo
            } else {
              reject(new Error('No se recibió un init_point válido.'));
            }
          },
          (error) => {
            reject(new Error('Error en la solicitud: ' + error.message));
          }
        );
    });
  }

  async onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };
      console.log('Datos del formulario:', formData.provinciaFormControl);

      const formaPago = formData.formaPagoFormControl;

      if (formaPago === 'Tarjeta de Crédito') {
        if (this.revisionCuotas === '1 cuota') {
          let carrito = this.carritoService.obtenerCarrito();

          let carritoNombres = carrito.map(
            (nombre) => `${nombre.nombre} X${nombre.cantidad}`
          );
          console.log('aca pruebaaa' + carritoNombres);

          let id_productos = carrito.map((id) => `${id.id}`);
          console.log(id_productos);

          await this.pagoMercadoPagoCredito(carrito);

          console.log('se pasó aqui');

          if (carritoNombres.length > 1) {
            for (let i = 0; i < carritoNombres.length; i++) {
              const datos = {
                formaPago: this.formaPago,
                cantCuotas: this.revisionCuotas,
                nombre: formData.nombreFormControl,
                email: formData.emailFormControl,
                telefono: formData.phoneNumberFormControl,
                dni: formData.dniFormControl,
                metodoEnvio: formData.formaEnvioFormControl,
                sucursal: formData.direccionSucursal,
                provincia: formData.provinciaFormControl,
                ciudad: formData.ciudadFormControl,
                postal: formData.postalFormControl,
                direccion: formData.direccionFormControl,
                dept: formData.departamentoFormControl,
                idProducto: id_productos[i],
                productos: carritoNombres[i],
              };
              this.pagoService.datosClienteEnvio(datos);
              this.carritoService.eliminarTodo();
              this.mostrarFormulario = false;
              this.mostrarCartel = true;
            }
            //this.pagoMercadoPago(carrito);
          } else {
            const datos = {
              formaPago: this.formaPago,
              cantCuotas: this.revisionCuotas,
              nombre: formData.nombreFormControl,
              email: formData.emailFormControl,
              telefono: formData.phoneNumberFormControl,
              dni: formData.dniFormControl,
              metodoEnvio: formData.formaEnvioFormControl,
              sucursal: formData.direccionSucursal,
              provincia: formData.provinciaFormControl,
              ciudad: formData.ciudadFormControl,
              postal: formData.postalFormControl,
              direccion: formData.direccionFormControl,
              dept: formData.departamentoFormControl,
              idProducto: id_productos,
              productos: carritoNombres[0],
            };

            this.pagoService.datosClienteEnvio(datos);
            // this.carritoService.eliminarTodo();
            // this.mostrarFormulario = false;
            // this.mostrarCartel = true;
          }
          //this.pagoMercadoPago(carrito);
          this.carritoService.eliminarTodo();
          this.mostrarFormulario = false;
          this.mostrarCartel = true;
        } else if (this.revisionCuotas === '3 cuotas sin interés') {
          let carrito = this.carritoService.obtenerCarrito();

          let carritoNombres = carrito.map(
            (nombre) => `${nombre.nombre} X${nombre.cantidad}`
          );
          console.log(carritoNombres);

          let id_productos = carrito.map((id) => `${id.id}`);
          console.log(id_productos);

          await this.pagoMercadoPagoCreditoTresCuotas(carrito);

          console.log('se pasó aqui');

          if (carritoNombres.length > 1) {
            for (let i = 0; i < carritoNombres.length; i++) {
              const datos = {
                formaPago: this.formaPago,
                cantCuotas: this.revisionCuotas,
                nombre: formData.nombreFormControl,
                email: formData.emailFormControl,
                telefono: formData.phoneNumberFormControl,
                dni: formData.dniFormControl,
                metodoEnvio: formData.formaEnvioFormControl,
                sucursal: formData.direccionSucursal,
                provincia: formData.provinciaFormControl,
                ciudad: formData.ciudadFormControl,
                postal: formData.postalFormControl,
                direccion: formData.direccionFormControl,
                dept: formData.departamentoFormControl,
                idProducto: id_productos[i],
                productos: carritoNombres[i],
              };
              this.pagoService.datosClienteEnvio(datos);
              this.carritoService.eliminarTodo();
              this.mostrarFormulario = false;
              this.mostrarCartel = true;
            }
            //this.pagoMercadoPago(carrito);
          } else {
            const datos = {
              formaPago: this.formaPago,
              cantCuotas: this.revisionCuotas,
              nombre: formData.nombreFormControl,
              email: formData.emailFormControl,
              telefono: formData.phoneNumberFormControl,
              dni: formData.dniFormControl,
              metodoEnvio: formData.formaEnvioFormControl,
              sucursal: formData.direccionSucursal,
              provincia: formData.provinciaFormControl,
              ciudad: formData.ciudadFormControl,
              postal: formData.postalFormControl,
              direccion: formData.direccionFormControl,
              dept: formData.departamentoFormControl,
              idProducto: id_productos,
              productos: carritoNombres[0],
            };

            this.pagoService.datosClienteEnvio(datos);
            // this.carritoService.eliminarTodo();
            // this.mostrarFormulario = false;
            // this.mostrarCartel = true;
          }
          //this.pagoMercadoPago(carrito);
          this.carritoService.eliminarTodo();
          this.mostrarFormulario = false;
          this.mostrarCartel = true;
        }
      } else if (formaPago === 'Tarjeta de Débito') {
        let carrito = this.carritoService.obtenerCarrito();

        let carritoNombres = carrito.map(
          (nombre) => `${nombre.nombre} X${nombre.cantidad}`
        );
        console.log(carritoNombres);

        let id_productos = carrito.map((id) => `${id.id}`);
        console.log(id_productos);

        await this.pagoMercadoPagoDebito(carrito);

        console.log('se pasó aqui');

        if (carritoNombres.length > 1) {
          for (let i = 0; i < carritoNombres.length; i++) {
            const datos = {
              formaPago: this.formaPago,
              cantCuotas: this.revisionCuotas,
              nombre: formData.nombreFormControl,
              email: formData.emailFormControl,
              telefono: formData.phoneNumberFormControl,
              dni: formData.dniFormControl,
              metodoEnvio: formData.formaEnvioFormControl,
              sucursal: formData.direccionSucursal,
              provincia: formData.provinciaFormControl,
              ciudad: formData.ciudadFormControl,
              postal: formData.postalFormControl,
              direccion: formData.direccionFormControl,
              dept: formData.departamentoFormControl,
              idProducto: id_productos[i],
              productos: carritoNombres[i],
            };
            this.pagoService.datosClienteEnvio(datos);
            this.carritoService.eliminarTodo();
            this.mostrarFormulario = false;
            this.mostrarCartel = true;
          }
          //this.pagoMercadoPago(carrito);
        } else {
          const datos = {
            formaPago: this.formaPago,
            cantCuotas: this.revisionCuotas,
            nombre: formData.nombreFormControl,
            email: formData.emailFormControl,
            telefono: formData.phoneNumberFormControl,
            dni: formData.dniFormControl,
            metodoEnvio: formData.formaEnvioFormControl,
            sucursal: formData.direccionSucursal,
            provincia: formData.provinciaFormControl,
            ciudad: formData.ciudadFormControl,
            postal: formData.postalFormControl,
            direccion: formData.direccionFormControl,
            dept: formData.departamentoFormControl,
            idProducto: id_productos,
            productos: carritoNombres[0],
          };

          this.pagoService.datosClienteEnvio(datos);
          // this.carritoService.eliminarTodo();
          // this.mostrarFormulario = false;
          // this.mostrarCartel = true;
        }
        //this.pagoMercadoPago(carrito);
        this.carritoService.eliminarTodo();
        this.mostrarFormulario = false;
        this.mostrarCartel = true;
      } else if (formaPago === 'Transferencia') {
        let carrito = this.carritoService.obtenerCarrito();

        let carritoNombres = carrito.map(
          (nombre) => `${nombre.nombre} X${nombre.cantidad}`
        );
        console.log(carritoNombres);

        let id_productos = carrito.map((id) => `${id.id}`);
        console.log(id_productos);
        if (carritoNombres.length > 1) {
          for (let i = 0; i < carritoNombres.length; i++) {
            const datos = {
              formaPago: this.formaPago,
              cantCuotas: this.revisionCuotas,
              nombre: formData.nombreFormControl,
              email: formData.emailFormControl,
              telefono: formData.phoneNumberFormControl,
              dni: formData.dniFormControl,
              metodoEnvio: formData.formaEnvioFormControl,
              sucursal: formData.direccionSucursal,
              provincia: formData.provinciaFormControl,
              ciudad: formData.ciudadFormControl,
              postal: formData.postalFormControl,
              direccion: formData.direccionFormControl,
              dept: formData.departamentoFormControl,
              idProducto: id_productos[i],
              productos: carritoNombres[i],
            };
            this.pagoService.pedidosPendientes(datos);
            this.carritoService.eliminarTodo();
            this.mostrarFormulario = false;
            this.mostrarCartel = true;
          }
        } else {
          const datos = {
            formaPago: this.formaPago,
            cantCuotas: this.revisionCuotas,
            nombre: formData.nombreFormControl,
            email: formData.emailFormControl,
            telefono: formData.phoneNumberFormControl,
            dni: formData.dniFormControl,
            metodoEnvio: formData.formaEnvioFormControl,
            sucursal: formData.direccionSucursal,
            provincia: formData.provinciaFormControl,
            ciudad: formData.ciudadFormControl,
            postal: formData.postalFormControl,
            direccion: formData.direccionFormControl,
            dept: formData.departamentoFormControl,
            idProducto: id_productos,
            productos: carritoNombres,
          };

          this.pagoService.pedidosPendientes(datos);
          this.carritoService.eliminarTodo();
          this.mostrarFormulario = false;
          this.mostrarCartel = true;
        }
      }
    }
    // this.miServicio.guardarDatos(formData).subscribe(...);
    else {
      console.error('El formulario no es válido');
    }
  }
}

@Component({
  selector: 'dialog-content',
  standalone: true,
  templateUrl: 'dialog-content.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
  ],
  styleUrl: './dialog-style.scss',
})
export class DialogContent {
  productoData: any;

  carrito: any[] = [];
  subtotal: number = 0;

  constructor(
    private pagoService: PagoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.obtenerProductosLocalStorage();
  }

  obtenerProductosLocalStorage() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.carrito);
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].oferta > 0) {
        this.subtotal +=
          this.carrito[i].precio_oferta * this.carrito[i].cantidad;
      } else {
        this.subtotal += this.carrito[i].precio * this.carrito[i].cantidad;
      }
    }
    console.log(this.subtotal);
  }
}

@Component({
  selector: 'advertencia-content',
  standalone: true,
  templateUrl: 'advertencia.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
  ],
  styleUrl: './advertencia-style.scss',
})
export class AdvertenciaContent {
  readonly dialog = inject(MatDialog);

  closeDialog() {
    this.dialog.closeAll();
  }
}
