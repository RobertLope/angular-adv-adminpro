import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef

  public formSubmitted = false;

  
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email]],
    password: ['', [ Validators.required]],
    remember: [false]
  });

  
  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) { }
               

  ngAfterViewInit(): void {
      this.googleInit();
  }


  googleInit() {

    google.accounts.id.initialize({
      client_id: '92614157288-hg56pn41td1opk4g4p787bovbpufevrs.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }


  handleCredentialResponse( response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard')
      });

  }


  login () {

    this.usuarioService.login( this.loginForm.value)
        .subscribe ( resp => {
          
          if ( this.loginForm.get('remember')?.value ){
            localStorage.setItem('email', this.loginForm.get('email')?.value);
            this.router.navigateByUrl('/dashboard')

          } else {
            localStorage.removeItem('email')
          }
            // Navegar al dashboard
          
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })


    // console.log( this.loginForm.value)
    
    //this.router.navigateByUrl('/');
  }

}
