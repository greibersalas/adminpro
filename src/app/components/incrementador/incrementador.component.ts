import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda  : string = 'Leyenda';
  @Input() progreso : number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgres') txtProgres: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
  }

  onChanges(e:number){

    //let elemHTML: any = document.getElementsByName('progreso')[0];


    if(e>=100){
      this.progreso = 100;
    }else if(e <= 0){
      this.progreso = 0;
    }else{
      this.progreso = e;
    }

    //elemHTML.value = Number(this.progreso);
    this.txtProgres.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor:number){
    if(this.progreso >= 100 && valor >0){
      this.progreso = 100;
      return;
    }
    if(this.progreso <= 0 && valor <0){
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);

    this.txtProgres.nativeElement.focus();
  }

}
