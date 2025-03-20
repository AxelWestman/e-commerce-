import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './producto/producto.component';
import { PagoComponent } from './pago/pago.component';
import { SomosComponent } from './somos/somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { ComoPagarComponent } from './como-pagar/como-pagar.component';

export const routes: Routes = [
    {path: 'content/:category', component: ContentComponent},
    {path: 'content/:productos/:categoria', component: ContentComponent},
    {path: 'producto/:id/:nombre', component: ProductoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'home', component: HomeComponent },
    {path: 'pago', component: PagoComponent},
    {path: 'somos', component: SomosComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'productos/ofertas', component: OfertasComponent},
    {path: 'como-comprar', component: ComoPagarComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
