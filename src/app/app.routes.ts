import { Routes } from '@angular/router';
import { FacultadComponent } from './components/facultad/facultad.component';
import { EscuelaComponent } from './components/escuela/escuela.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    { 
        path: 'facultad',
        component: FacultadComponent,
        title:"Facultad"
     },
    { 
        path: 'escuela',
        component: EscuelaComponent,
        title:"Escuela" 
    },
    { 
        path: '**',
        redirectTo: "",
        pathMatch: 'full'
    }
];
