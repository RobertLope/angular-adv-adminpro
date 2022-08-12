import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {



  constructor() { }


  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {
      
      const url = `${ base_url }/upload/${ tipo }/${ id }`
      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data);

      if ( data.ok ){
        Swal.fire(
          'Bien hecho',
          'Imagen actualizada',
          'success'
        )
        return data.nombreArchivo;
      } else {
        Swal.fire( 'Error', data.msg, 'error')
        return false;
      }


    } catch (err) {

      return false;
    }
  }



}
