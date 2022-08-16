import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(public modalImagen: ModalImagenService,
              public fileUpload: FileUploadService) { }

  ngOnInit(): void {
    
  }



  cerrarModal(){
    this.modalImagen.cerrarModal();
    this.imgTemp= null;
  };



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

    const id = this.modalImagen.id;
    const tipo = this.modalImagen.tipo;

    this.fileUpload
    .actualizarFoto( this.imagenSubir, tipo, id || '') 
    .then ( img =>{ 
      this.modalImagen.nuevaImagen.emit(img);
      this.cerrarModal();
    })
   };

  

}
