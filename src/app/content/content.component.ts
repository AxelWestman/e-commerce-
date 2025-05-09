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
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {Subject} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HttpClientModule, FooterComponent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule,RouterOutlet, RouterLink, RouterLinkActive, MatCardModule, MatButtonModule, CommonModule, NgxPaginationModule, MatIconModule,  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy  {

  public dataSubscription: Subscription | null = null;
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300;

  valuee$: string = "";

  receivedData: any;
  receivedDataArray:any[] = [];
  productosNombre: any[] = []

  public page! : number;

  datoPasadoDeServicio = "";

  paramsUrl: boolean | undefined;

  filtros = ["Precio menor a mayor", "Precio mayor a menor"]

  filtroValor: string = '';
  filtroArrayMasNuevoAMasViejo:any[] = [];
  filtroArrayMasViejoAMasNuevo: any[] = [];
  filtroArrayPrecioMenorAMayor:any[] = [];
  filtroArrayPrecioMayorAMenor:any[] = [];

  filtrarProductos(filtro: string){
    if(filtro === "Destacados"){
      this.filtroValor = "Destacados"
    }
    else if(filtro === "Más nuevo a más viejo"){
      this.filtroValor = "Más nuevo a más viejo"
      if(this.paramsUrl === false){
        this.datosService.getProductosGeneral(this.receivedData, this.filtroValor).subscribe(data => {
          this.filtroArrayMasNuevoAMasViejo = data.data;
          console.log(this.filtroArrayMasNuevoAMasViejo);
         });
      } else{
      this.datosService.getProductosPorCategoria(this.receivedData, this.filtroValor).subscribe(data => {
        this.filtroArrayMasNuevoAMasViejo = data.data;
        console.log(this.filtroArrayMasNuevoAMasViejo);
       });
      }
    }
    else if(filtro === "Más viejo a más nuevo"){
      this.filtroValor = "Más viejo a más nuevo"
      if(this.paramsUrl === false){
        this.datosService.getProductosGeneral(this.receivedData, this.filtroValor).subscribe(data => {
          this. filtroArrayMasViejoAMasNuevo = data.data;
          console.log(this.filtroArrayMasNuevoAMasViejo);
         });
      } else{
      this.datosService.getProductosPorCategoria(this.receivedData, this.filtroValor).subscribe(data => {
        this. filtroArrayMasViejoAMasNuevo = data.data;
        console.log(this.filtroArrayMasNuevoAMasViejo);
      });
    }
    }
    else if(filtro === "Precio menor a mayor"){
      this.filtroValor = "Precio menor a mayor"
      if(this.paramsUrl === false){
        this.datosService.getProductosGeneral(this.receivedData, this.filtroValor).subscribe(data => {
          this.filtroArrayPrecioMenorAMayor = data.data;
          console.log(this.filtroArrayMasNuevoAMasViejo);
         });
      } else{   
      this.datosService.getProductosPorCategoria(this.receivedData, this.filtroValor).subscribe(data => {
        this.filtroArrayPrecioMenorAMayor = data.data;
      });
     }
    }
    else if(filtro === "Precio mayor a menor"){
      this.filtroValor = "Precio mayor a menor"
      if(this.paramsUrl === false){
        this.datosService.getProductosGeneral(this.receivedData, this.filtroValor).subscribe(data => {
          this.filtroArrayPrecioMayorAMenor = data.data;
          console.log(this.filtroArrayMasNuevoAMasViejo);
         });
      } else{
      this.datosService.getProductosPorCategoria(this.receivedData, this.filtroValor).subscribe(data => {
        this.filtroArrayPrecioMayorAMenor = data.data;
      });
    }
    }
    else{
      this.filtroValor= "Destacados";
    }
  }

  constructor(private datosService: DatosService, private carritoService: CarritoService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filtroValor = 'Precio menor a mayor'
      console.log(params['category'])
      if(params['categoria'] === undefined){
        this.paramsUrl = false;
        this.receivedData = params['category'];
       this.datosService.getProductosGeneral(this.receivedData, this.filtroValor).subscribe(data => {
        this.filtroArrayPrecioMenorAMayor = data.data;
       })
      } else{
        this.paramsUrl = true;
      this.receivedData = params['categoria'];
      console.log("aca " + this.receivedData);
      this.datosService.getProductosPorCategoria(this.receivedData, this.filtroValor).subscribe(data => {
        this.filtroArrayPrecioMenorAMayor = data.data;
        console.log(this.filtroArrayPrecioMenorAMayor);
      });
    }
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
  this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
    this.performSearch(searchValue);
  });

  }

  busqueda(){
    this.searchSubject.next(this.valuee$);
  }

  llenarData() { 
    this.datosService.busquedaDatosNombre(this.valuee$)
      .then(data => {
        this.productosNombre = data;
        console.log("el array de productos: " + this.productosNombre);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
      });
  }

  performSearch(searchValue: string) {
    // Perform the actual search operation here
    console.log('Performing search for:', searchValue);
    this.llenarData();
    // ... Your search logic ...
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

  