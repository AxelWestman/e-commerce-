import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './producto/producto.component';
import { PagoComponent } from './pago/pago.component';
import { SomosComponent } from './somos/somos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
    {path: 'content/:categoria', component: ContentComponent},
    {path: 'producto/:id', component: ProductoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'home', component: HomeComponent },
    {path: 'pago', component: PagoComponent},
    {path: 'somos', component: SomosComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
