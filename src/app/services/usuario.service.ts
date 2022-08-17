import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


declare const google: any;


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario!: Usuario;

  constructor(private http: HttpClient,
              private router: Router) { }


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get headers() {
    return {
     headers: {
      'x-token': this.token
    }
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');

    //google.accounts.id.revoke( 'elclogaodeturno@gmail.com', () => {
   // })
  }


  validarToken(): Observable<boolean> {


    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { nombre, email, role, google, img = '', uid} = resp.user;   
        this.usuario = new Usuario(nombre, email, '', role,img, google, uid);
        return true;
      }),
      catchError( error =>  of(false))
    );

  }



  crearUsuario( formData: RegisterForm){

    
     return this.http.post(`${ base_url }/usuarios`,formData)
                    .pipe(
                      tap( (resp: any) => {
                        this.guardarLocalStorage(resp.token, resp.menu);
                      })
                    );

  }

  actualizarPerfil ( data: {email:string, nombre: string, role?: string}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`,data, this.headers);

  }



  login( formData: LoginForm){

    
    return this.http.post(`${ base_url }/login`,formData)
                  .pipe(
                    tap( (resp: any) => {
                      this.guardarLocalStorage(resp.token, resp.menu);
                    })
                  );

 }


 loginGoogle ( token: String){

   return this.http.post(`${ base_url }/login/google`, {token})
                   .pipe(
                    tap( (resp: any) => {
                      //console.log(resp)
                      this.guardarLocalStorage(resp.token, resp.menu);
                    })
                  );
 }

 guardarLocalStorage(token: string, menu: any){

  console.log(menu)
        localStorage.setItem('token', token );
       
        console.log('Guardando en local storage')
        localStorage.setItem('menu', JSON.stringify(menu));
 }


 cargarUsuarios( desde: number = 0){

  // http://localhost:3000/api/usuarios?desde=5

  const url = `${base_url}/usuarios?desde=${ desde }`;

  return this.http.get<CargarUsuario> ( url, this.headers)
          .pipe(
            map(resp => {
              const usuarios = resp.usuarios.map( 
                user => new Usuario(user.nombre, user.email, '', user.role, user.img, user.google,  user.uid));

              return {
                total: resp.total,
                usuarios
              };
            })
          )

 }

 eliminarUsuario( usuario: Usuario){

  const url = `${base_url}/usuarios/${ usuario.uid }`;
  
  return this.http.delete(url, this.headers)
        
  
  }

  guardarUsuario( usuario: Usuario){

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`,usuario, this.headers);

  }




}
