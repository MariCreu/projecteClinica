import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) {
    console.log('servicio medico listo');
  }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp);
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }
  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medicos)
      );
  }
  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Medico borrado', ' El médico ha sido elimiando correctamente', 'success');
        return true;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          swal('Medico Actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      url += '?token=' + this.usuarioService.token;

      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          swal('Médico Creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }

  }
  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }
}
