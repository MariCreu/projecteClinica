import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscriber, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.devuelveObservable().subscribe(
      (numero: any) => console.log('Subs', numero),
      error => console.log('Error en el observable', error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }
  devuelveObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };

        observer.next(salida);

      }, 1000);
    }).pipe(
    //  map(resp => { return resp.valor }),
      // filter((resp, index) => {
      //   if (resp % 2 === 1) {
      //     return true;

      //   } else {
      //     return false;
      //   }
     // })
    );
  }
}
