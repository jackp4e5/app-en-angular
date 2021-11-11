import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})


export class InfoPaginaService {

  info: InfoPagina ={};
  cargada=false;

  equipo: any []=[]; // eqquipo ahora sera ejecutado con esta function cargarEquipo()

  constructor(private http: HttpClient){
      this.cargarInfo(); // cargar info esta la informasion de el archivo json
      this.cargarEquipo();// esta la informacion de firebase
    
   }



   private cargarInfo(){
     //leer el archivo json
     this.http.get('assets/Data/data-pagina.json')
     .subscribe( (resp:InfoPagina) => {

       this.cargada=true;
       this.info=resp;

     console.log(resp);
     })
   }


// esto lee la informacion de firebase con this.http.get() como parametro se pone el url del firebase 
   private cargarEquipo(){
    this.http.get('https://angular-jack-fccc2-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp:any) => {

      this.cargada=true;
      this.equipo=resp;
      console.log(resp);
    })
   }
}
