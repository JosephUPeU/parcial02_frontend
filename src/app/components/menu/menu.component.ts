import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: "Casa",
        icon: "pi pi-home",
        routerLink: "/"
      },
      {
        label: "Mantener",
        icon: "pi pi-cog",
        items: [
          {
            label: "Escuela",
            icon: "pi pi-briefcase",
            routerLink: "/escuela"
          },
          {
            label: "Facultad",
            icon: "pi pi-building",
            routerLink: "/facultad"
          }
        ]
      }
    ];
  }
}