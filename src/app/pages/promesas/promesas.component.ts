import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    this.contarTres()
      .then(
        () => console.log('Terminó'),
      )
      .catch(error => console.log('Error en la promesa', error));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        console.log(contador);
        contador += 1;
        if (contador === 3) {
          resolve();
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }
}
