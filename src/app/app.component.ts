import { Component, ChangeDetectorRef, OnInit, viewChild, ViewChild  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDrawerMode,MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { DatosService } from './datos.service';
import {MatBadgeModule} from '@angular/material/badge';
import { CarritoService } from './carrito.service';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Productos',
    children: [
      {
        name: 'Ropa',
        children: [ {name: 'Toda la ropa'}, {name: 'Remeras'}, {name: 'Blusas'}, {name: 'Camisas'}, {name: 'Camisolas'}, {name: 'Túnicas'}, {name: 'Vestidos'} , {name: 'Soleros'}, {name: 'Palazos'}, {name: 'Babuchas'} , {name: 'Leggings'}, {name: 'Calza'}, {name: 'Shorts'}, {name: 'Bermudas'}, {name: 'Polleras'}, {name: 'Faldas'}],
      },
      {
        name: 'Accesorios',
        children: [{name: 'Todos los accesorios'}, {name: 'Pareo'}, {name: 'Pañuelos'}, {name: 'Pashminas'}, {name: 'Sombreros'}, {name: 'Capelinas'}, {name: 'Ruanas'}, {name: 'Mantones'}, {name: 'Bufandas'}, {name: 'Cuellos'}, {name: 'Japamalas Indias'}, {name: 'Collares'}, {name: 'Sobres'}, {name: 'Monederos Pakistan'}, {name: 'Carteras'}, {name: 'Bolsos'}],
      },{
        name: 'Sahumerios',
        children: [{name: 'Todos los sahumerios'}, {name: 'Satya'}, {name: 'Goloka'}, {name: 'Namaste'}, {name: 'Thales'}, {name: 'Mistic Spirits'}, {name: 'Sagrada Madre'}]
      },{
        name: 'Decoración',
        children: [{name: 'Toda la decoración'}, {name: 'Manta'}, {name: 'Corazón individual'}, {name: 'Corazón doble'}, {name: 'Corazón triple'}, {name: 'Tira colgante India'} ]
      },{
        name: 'Ofertas'
      }
    ],
  },
];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ,MatToolbarModule,MatListModule, MatButtonModule, MatSidenavModule, MatIconModule, MatTreeModule, MatBadgeModule, MatMenuModule, MatMenuTrigger],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @ViewChild(MatMenuTrigger) ropaTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) accesoriosTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) sahumeriosTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) decoracionTrigger!: MatMenuTrigger;

  handleMenuClick(event: Event, category: string): void {
    // Evitar que el menú se cierre automáticamente
    event.stopPropagation();

    // Abrir el menú correspondiente
    switch (category) {
      case 'ropa':
        this.ropaTrigger.openMenu();
        break;
      case 'accesorios':
        this.accesoriosTrigger.openMenu();
        break;
      case 'sahumerios':
        this.sahumeriosTrigger.openMenu();
        break;
      case 'decoracion':
        this.decoracionTrigger.openMenu();
        break;
    }

    // Navegar a la ruta deseada
    this.router.navigate(['/content', category]);
  }

  title = 'colombina-web';

  valorBadge = 0;

  selectedNode: string = '';
  
  dataSource = TREE_DATA;
  
  childrenAccessor = (node: FoodNode) => node.children ?? [];
  
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  constructor(private datosService: DatosService, private changeDetectorRef: ChangeDetectorRef, private carritoService: CarritoService, private router: Router) {}
  ngOnInit() {
    this.carritoService.carritoNum$.subscribe((carritoNum) => {
      this.valorBadge = carritoNum; // Actualizar la vista cuando cambie el carrito
    });
  }
  
  navigateTo(category: string): void {
    this.router.navigate(['/content', category]);
  }
  
  onNodeClick(node: any) {
    // Si el nodo tiene un nombre, lo asignamos a la variable
    this.selectedNode = node.name || node; // Si es un nodo con subelementos, podría ser una cadena directa
    if(this.selectedNode === 'Toda la ropa'){
      location.href ="content/ropa";
    } else if(this.selectedNode === 'Todos los accesorios'){
      location.href ="content/accesorios";
    } else if(this.selectedNode === 'Todos los sahumerios'){
      location.href="content/sahumerios";
    } else if(this.selectedNode === 'Toda la decoración'){
      location.href="content/decoracion"
    } else{
    console.log('Nodo seleccionado:', this.selectedNode);
    this.datosService.datoParaContenido(this.selectedNode);
  }
}

}
