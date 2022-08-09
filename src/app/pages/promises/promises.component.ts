import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

     this.getUsuarios().then (usuarios => {
      console.log(usuarios)
     }); 
    


   /*  const promesa = new Promise( ( resolve, reject ) => {

      if ( false ){
        resolve('Hola Mundo');
      } else {
        reject('Algo salio mal');
      }

    });

    promesa.then ( (mensjae) => {
      console.log(mensjae);
    })
    .catch( error => console.log('Error en mi promesa', error));
 
    console.log('Fin del init'); */
  }

  getUsuarios(){

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => console.log(body.data));

    });

    return promesa;

  }


}
