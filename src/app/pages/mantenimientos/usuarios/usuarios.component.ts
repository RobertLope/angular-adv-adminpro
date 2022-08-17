import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public totalUsuarios: number = 0;
  public usuarios: Usuario[]= [];
  public usuariosTemp: Usuario[]= [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuarioServic: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImagen: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();


  }       

  ngOnInit(): void {
    
        this.cargarUsuarios();

        this.imgSubs = this.modalImagen.nuevaImagen
        .pipe(
          delay(100)
        )
            .subscribe ( img => {
          this.cargarUsuarios() 
        });
  };

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServic.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios}) => {
      this.totalUsuarios= total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })

  }

  cambiarPagina( valor: number){

    this.desde += valor;

    if ( this.desde < 0 ){
          this.desde = 0;
    } else if ( this.desde > this.totalUsuarios) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();

  }

  buscar( termino: string){

    if ( termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
        .subscribe ((resulatos: any)=> {
          this.usuarios = resulatos;
        });
        return this.usuarios;
  } 

  eliminarUsuario( usuario: Usuario){

    if ( usuario.uid !== this.usuarioServic.usuario.uid){
      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Esta a punto de borrar a ${ usuario.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            this.usuarioServic.eliminarUsuario(usuario)
            .subscribe(  () => {
              this.cargarUsuarios()
              Swal.fire(
                'Usuario borrado',
                `${ usuario.nombre } fue eliminado correctamente`,
                'success'
                );
              });
         
        }
      })

    } else {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    

  }

  cambiarRol( usuario: Usuario){

    this.usuarioServic.guardarUsuario( usuario )
        .subscribe( resp => {
          console.log(resp);
        });
  }


  abrirModal(usuario: Usuario){
    console.log(usuario)
    this.modalImagen.abrirModal( 'usuarios', usuario.uid!, usuario.img! );

  }

  

}
