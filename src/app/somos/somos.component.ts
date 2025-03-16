import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-somos',
  standalone: true,
  imports: [FooterComponent,  RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './somos.component.html',
  styleUrl: './somos.component.scss'
})
export class SomosComponent {

}
