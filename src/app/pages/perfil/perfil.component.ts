import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';



  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUpload: FileUploadService) { 

      this.usuario = usuarioService.usuario;
              
    }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
        .subscribe( () => {
        
          const { nombre, email} = this.perfilForm.value;
           this.usuario.nombre = nombre;
           this.usuario.email = email;

           Swal.fire(
            'Bien hecho',
            'Usuario actualizado',
            'success'
          )
        },(err) => {
          Swal.fire( 'Error', err.error.msg, 'error')
        });
  }

  cambiarImagen ( event: any ){
  
    const file = event?.target?.files[0] || '';

    if( file ){
      this.imagenSubir = file;
    }
      if ( !file ){ 
        Swal.fire( 'Error', 'No se ha podido subir la imagen', 'error')
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend= () => {
        this.imgTemp = reader.result;
      }

      return this.imgTemp;
  }


  subirImagen(){

    this.fileUpload
    .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '') 
    .then ( img =>{ 
      this.usuario.img = img;
    })
   };

  }


