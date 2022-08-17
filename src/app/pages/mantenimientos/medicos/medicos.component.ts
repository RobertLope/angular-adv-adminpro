import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Subscription, delay } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {


  public medicos: Medico[] = [];
  public cargando: boolean = true;

   private imgSubs!: Subscription;
   private _medicoTemp: Medico[]= [];



  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService) { }


  ngOnInit(): void {

    this.cargando = true;
    this._medicoTemp = this.medicos;

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
        .subscribe ( img => {
      this.cargarMedicos() 
    });

  }

  buscar( termino: string){

    if ( termino.length === 0) {
      return this.medicos = this._medicoTemp;
    }

    this.busquedaService.buscar('medicos', termino)
        .subscribe ((resulatos: any)=> {
          this.medicos = resulatos;
        });
        return this.medicos;
  } 


  
  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe ( medicos => {
          this.medicos = medicos;
          this._medicoTemp = this.medicos;
          this.cargando = false;
        })
  }


  guardarCambios (medico: Medico) {

    this.medicoService.actualizarMedico( medico )
        .subscribe( resp => {
          Swal.fire('Actualizado', medico.nombre, 'success');
        });



  }
  
  borrarMedico (medico: Medico){

      Swal.fire({
        title: '¿Borrar usuario?', 
        text: `Esta a punto de borrar a ${ medico.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            this.medicoService.eliminarMedico(medico._id)
            .subscribe(  () => {
              this.cargarMedicos()
              Swal.fire(
                'Usuario borrado',
                `${ medico.nombre } fue eliminado correctamente`,
                'success'
                );
              });
        }
      })
    } 
  
  
  abrirModal(medico: Medico){

    this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img)
  } 
}
