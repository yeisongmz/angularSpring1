import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso: string[] = ['JavaScript', 'TypeScript', 'Java SE', 'Spring Boot', 'PHP'];
  habilitar: boolean = true;

  constructor() { }

  setHabilitar(): void{
    this.habilitar = !this.habilitar;
    //console.log(`Se precionó el boton, ${this.habilitar}`);
  };
}
