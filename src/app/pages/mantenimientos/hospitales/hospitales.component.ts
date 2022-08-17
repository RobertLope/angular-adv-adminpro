import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {


  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

   private imgSubs!: Subscription;
   private _hospitalTemp: Hospital[]= [];


  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargando = true;
    this._hospitalTemp = this.hospitales;

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
        .subscribe ( img => {
      this.cargarHospitales() 
    });

  }

  buscar( termino: string){

    if ( termino.length === 0) {
      return this.hospitales = this._hospitalTemp;
    }

    this.busquedasService.buscar('hospitales', termino)
        .subscribe ((resulatos: any)=> {
          this.hospitales = resulatos;
        });
        return this.hospitales;
  } 

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe ( hospitales => {
          this.hospitales = hospitales;
          this._hospitalTemp = this.hospitales;
          this.cargando = false;
        })
  }

  
  guardarCambios (hospital: Hospital) {

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });



  }
  
  eliminarHospital (hospital: Hospital){
    this.hospitalService.eliminarHospital( hospital._id)
    .subscribe( resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });

  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingreses el nombre del nuevo hospital',
      input: 'text',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL'
    })
    
   if ( value!.trim().length > 0 ){
    this.hospitalService.crearHospital(value!)
        .subscribe( (resp: any) => {
          this.hospitales.push( resp.hospital)
        });
   }
  }

  abrirModal(hospital: Hospital){

    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img)
  } 

  


}
