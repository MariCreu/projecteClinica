import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;

  // Importo el router para trabajar con los eventos del router y traerme la data
  // Importo la clase Title de Angular para poder cambiar la pestaña conforme navegue por la web
  // Importo la clase Meta para añadir una metatag en el html con la descripcion
  constructor(private router: Router,
    private title: Title,
    private meta: Meta) {

    this.getDataRoute().subscribe(event => {
      this.titulo = event.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }
  getDataRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
