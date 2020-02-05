import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchirvoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }));
  }

  login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError(err => {
          swal('Error en el login', err.error.mensaje, 'error');
          return throwError(err);
        })
        );
  }



  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          swal('Usuario creado', usuario.email, 'success');
          return res.usuario;
        }),
        catchError(err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        })
        );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          if (usuario._id === this.usuario._id) {
            this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
            let usuarioDB: Usuario = resp.usuario;
          }
          swal('Usuario Actualizado', usuario.nombre, 'success');
          return true;

        }),
        catchError(err => {
          swal('Error al actualizar el usuario', err.error.mensaje, 'error');
          return throwError(err);
        })
      );
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchirvoService.subirArchivo(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }
  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.usuarios)
      );
  }
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Usuario borrado', ' El usuario ha sido elimiando correctamente', 'success');
        return true;
      })
    );
  }
}

