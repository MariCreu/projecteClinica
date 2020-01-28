import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros = 0;
  cargando: boolean = true;
  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(resp =>{
        this.cargarUsuarios();
    });
  }
  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })

      .then(borrar => {
        console.log(borrar);
        if (borrar) {
          this.usuarioService.borrarUsuario(usuario._id)
            .subscribe(resp => {
              this.desde = 0;
              this.cargarUsuarios();
            });
        }
      });
  }
  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }
}
