import { Medico } from '../models/medico.model';

export interface CargarMedicos {
    ok: boolean;
    medicos: Medico[];
}


export interface CargarMedico {
    ok: boolean;
    medico: Medico;
}