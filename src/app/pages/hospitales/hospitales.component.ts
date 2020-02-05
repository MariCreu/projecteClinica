import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';




@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }
  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe(hospitales => this.hospitales = hospitales);
  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino).subscribe(hospitales => this.hospitales = hospitales);
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe(() => this.cargarHospitales());
  }
  async crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Introduzca el nombre del hospital',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'info'
    }).then((valor: { value: string }) => {
      if (!valor || valor.value.length === 0) {
        return;
      }
      this.hospitalService.crearHospital(valor.value).subscribe(() => this.cargarHospitales());
    });


  }
  actualizarImagen(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
