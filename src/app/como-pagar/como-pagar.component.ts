import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-como-pagar',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './como-pagar.component.html',
  styleUrl: './como-pagar.component.scss'
})
export class ComoPagarComponent {

  }
