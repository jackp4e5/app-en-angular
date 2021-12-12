import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[]=[];
  productosFiltrados:Producto[]=[];

  constructor(private http:HttpClient) { 

    this.cargarPoductos();
  }

private cargarPoductos(){
  return new Promise(( resolve , reject )=>{
    this.http.get('https://angular-jack-fccc2-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp:any) =>{
  
      
      this.productos = resp;
     
      setTimeout(()=>{
        this.cargando = false;
    
     
      },1000)
    
    });
  });
  
}
getProducto(id:string){
 return this.http.get(`https://angular-jack-fccc2-default-rtdb.firebaseio.com/productos/${ id }.json`);
}


buscarProducto(termino:string){

  if (this.productos.length === 0){
    // cragar rpoductos
    this.cargarPoductos().then(() => {
      // esto se ejecuta despues de obtener los productos 
      // aplicar filtros
  this.filtrarProductos(termino);
    });
  } else{
    // aplicar el filtro
    this.filtrarProductos(termino);   // si ya hay datos en bucarProductos aqui se vuelve a llamar de nuevo
  }
 
}


private filtrarProductos(termino:string){    // termino es lo que escribe el ususario 
    console.log(this.productos);
    this.productosFiltrados=[]; // esto es para purgar el arreglo esto es para que no haga una adicion 
    
    termino= termino.toLocaleLowerCase();  // en toloca la L es en mayuscula y lower la Ltsmbien va en mayuscula Case la c tambien
// esto de lowerCase sirve para cunado la persona escribe en mayuscula on minuscula 
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria?.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >=0 ){   // || esto significa  ( o ) puedes hacer esto 
        this.productosFiltrados.push(prod);
      }
    })
   }
}
