import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { URL_SERVICIOS } from '../../config/config';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedicos(termino).subscribe((medicos) => this.medicos = medicos);
  }
  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(medicos => this.medicos = medicos);
  }
  borrarMedico(medico: Medico) {
    this.medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());

  }
}
