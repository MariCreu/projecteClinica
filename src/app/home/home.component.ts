import { Component, OnInit } from '@angular/core';

declare function init_plugins();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
