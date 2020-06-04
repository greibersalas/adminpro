import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().subscribe(
      numero =>console.log("Subs ",numero),
      error => console.error('Error en el obs ',error),
      () => console.log("EL observador termino")
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('Cerrando pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{

    return new Observable((observer: Subscriber<any>) =>{
      let contador = 0;
      const intervalo = setInterval(() =>{
        contador ++;

        const salida = {
          valor:contador
        }
        observer.next(salida);

        /* if(contador === 3){
          clearInterval(intervalo);
          observer.complete();
        } */

      },1000)
    }).pipe(
      map(resp =>{
        return resp.valor;
      }),
      filter((valor, index) =>{
        if((valor%2)===1){
          return true;
        }else{
          return false;
        }
      })
    );
  }

}
