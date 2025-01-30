import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './producto/producto.component';

export const routes: Routes = [
    {path: 'content', component: ContentComponent},
    {path: 'producto', component: ProductoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
