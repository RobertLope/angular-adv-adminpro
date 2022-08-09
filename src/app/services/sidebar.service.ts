import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [
    {

    titulo: 'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'Graficas', url: 'grafica1'},
      {titulo: 'Main', url: '/'},
      {titulo: 'Promesas', url: 'promises'},
      {titulo: 'ProgressBar', url: 'progress'},
      {titulo: 'Rxjs', url: 'rxjs'},
    ]
    }
];

  constructor() { }


}
