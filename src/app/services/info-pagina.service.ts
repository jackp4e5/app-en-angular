import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina ={};
  cargada=false;

  constructor(private http: HttpClient){
    //console.log('servicio de quee!!!!!');

    //leer el archivo json
     this.http.get('assets/Data/data-pagina.json')
     .subscribe( (resp:InfoPagina) => {

       this.cargada=true;
       this.info=resp;

     console.log(resp.titulo);
     })
   }
}
