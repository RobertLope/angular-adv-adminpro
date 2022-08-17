import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
     headers: {
      'x-token': this.token
    }
    }
  }

  private transformarUsuarios( resultados: Usuario[] ): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.role, user.img, user.google,  user.uid)
      );
  }

  private transformarHospitales( resultados: Hospital[] ): Hospital[]{
    return resultados.map(
      hospital => new Hospital(hospital._id, hospital.img,hospital.nombre, hospital.usuario)
      );
  }

  private transformarMedicos( resultados: Medico[] ): Medico[]{
    return resultados.map(
      medico => new Medico( medico._id,medico.nombre, medico.img, medico.hospital,medico.usuario)
      );
  }


  busquedaGlobal( termino: string){

    const url = `${base_url}/todo/${termino}`;
    return this.http.get( url, this.headers)
  }



  buscar( tipo: 'usuarios'|'medicos'|'hospitales',
          termino: string  
  ) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>( url, this.headers)
      .pipe(
        map( (resp:any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resulatos );
                
          case 'hospitales':
            return this.transformarHospitales(resp.resulatos);
          
          case 'medicos':
          return this.transformarMedicos(resp.resulatos);

            default:
              return [];
          }
        })
      );

   
  }

}
