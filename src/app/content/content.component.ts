import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {

  datoPasadoDeServicio = "";

  constructor(private datosService: DatosService) {}
  ngOnInit() {
    this.pasarInfo()
  }

  pasarInfo(){
    this.datoPasadoDeServicio = this.datosService.contenidoParaCargar;
    console.log("el dato en content es " + this.datoPasadoDeServicio);
  }


  

}
