import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDrawerMode,MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { DatosService } from './datos.service';

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
        children: [{name: 'Remeras'}, {name: 'Blusas'}, {name: 'Camisas'}, {name: 'Camisolas'}, {name: 'Túnicas'}, {name: 'Vestidos'} , {name: 'Soleros'}, {name: 'Palazos'}, {name: 'Babuchas'} , {name: 'Leggings'}, {name: 'Calza'}, {name: 'Shorts'}, {name: 'Bermudas'}, {name: 'Polleras'}, {name: 'Faldas'}],
      },
      {
        name: 'Accesorios',
        children: [{name: 'Pareo'}, {name: 'Pañuelos'}, {name: 'Pashminas'}, {name: 'Sombreros'}, {name: 'Capelinas'}, {name: 'Ruanas'}, {name: 'Mantones'}, {name: 'Bufandas'}, {name: 'Cuellos'}, {name: 'Japamalas Indias'}, {name: 'Collares'}, {name: 'Sobres'}, {name: 'Monederos Pakistan'}, {name: 'Carteras'}, {name: 'Bolsos'}],
      },{
        name: 'Sahumerios',
        children: [{name: 'Satya'}, {name: 'Goloka'}, {name: 'Namaste'}, {name: 'Thales'}, {name: 'Mistic Spirits'}, {name: 'Sagrada Madre'}]
      },{
        name: 'Decoración',
        children: [{name: 'Manta'}, {name: 'Corazón individual'}, {name: 'Corazón doble'}, {name: 'Corazón triple'}, {name: 'Tira colgante India'} ]
      }
    ],
  },
];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ,MatToolbarModule,MatListModule, MatButtonModule, MatSidenavModule, MatIconModule, MatTreeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'colombina-web';

  selectedNode: string = '';

  dataSource = TREE_DATA;

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  constructor(private datosService: DatosService) {}

  onNodeClick(node: any) {
    // Si el nodo tiene un nombre, lo asignamos a la variable
    this.selectedNode = node.name || node; // Si es un nodo con subelementos, podría ser una cadena directa
    console.log('Nodo seleccionado:', this.selectedNode);
    this.datosService.datoParaContenido(this.selectedNode);
  }

}
