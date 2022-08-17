import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {


  public usuario!: Usuario;

  public imgUrl = '';

  constructor(private usuarioService: UsuarioService,
              private router: Router) { 

    this.imgUrl = usuarioService.usuario.imagenUrl;

    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }


  buscar(termino: string){

    if (termino.length === 0) {
      this.router.navigateByUrl(`/dashboard`)
    }

    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);

  }

}
