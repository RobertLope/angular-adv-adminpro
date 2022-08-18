import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';

const childRoutes: Routes = [
  
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'}},
          { path: 'busqueda/:termino', component: BusquedaComponent , data: { titulo: 'Busqueda'}},
          { path: 'grafica1', component: Grafica1Component , data: { titulo: 'Grafica #1'}},
          { path: 'perfil', component: PerfilComponent , data: { titulo: 'Perfil de usuario'}},
          { path: 'progress', component: ProgressComponent , data: { titulo: 'ProgressBar'}},
          { path: 'promises', component: PromisesComponent , data: { titulo: 'Promesas'}},
          { path: 'rxjs', component: RxjsComponent , data: { titulo: 'Rxjs'}},

          // Mantenimientos
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Perfil de hospital'}},
          { path: 'medicos', component: MedicosComponent , data: { titulo: 'Mantenimiento de Medicos'}},
          { path: 'medico/:id', component: MedicoComponent , data: { titulo: 'Perfil de medico'}},

          // Rutas de Admin
          { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent , data: { titulo: 'Perfil de usuario'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [ RouterModule]
})
export class ChildRoutesModule { }
