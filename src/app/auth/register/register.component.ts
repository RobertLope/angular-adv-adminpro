import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  
  public registerForm = this.fb.group({
    nombre: ['Robert', [Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com', [ Validators.required, Validators.email]],
    password: ['1234567', [ Validators.required]],
    password2: ['12345', [ Validators.required]],
    terminos: [false, Validators.requiredTrue],
  },{
    Validators: this.passwordsIguales('password', 'password2')
  } );




  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.value );
  
    if ( this.registerForm.invalid){
      return;
    } 

    // Realizar el posteo

    this.usuarioService.crearUsuario( this.registerForm.value )
          .subscribe( resp => {
            console.log('usuario creado');
            console.log(resp);
          }, (err)=> {
            // Si sucede un error
            Swal.fire('Error', err.error.msg, 'error')
          });


  }

 
  campoNoValido(campo: string): boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
        return true;
    } else {
      return false;
    }
  }

  aceptarTerminos (): boolean{

    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( pass1 !== pass2 && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales(pass1: string, pass2: string){

    return (formGroup : FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);


      if ( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true});
      }

    }

  }

}
