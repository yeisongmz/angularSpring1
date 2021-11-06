import { Cliente } from 'src/app/models/clientes/cliente';
import { Region } from 'src/app/models/clientes/region';
import { Injectable } from '@angular/core';


import {catchError, map, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class  ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';


  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router : Router) { }

  getRegiones(): Observable<Region[]>{

    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  /* // obtener todos los clientes de una
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response=> {

        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.apellido = cliente.apellido.toUpperCase();


          //let datePipe = new DatePipe('es');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
      }
        )
    );
  } */

  // obtener todos los clientes por pagina
  getClientes(page: number): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any)=> {


        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.apellido = cliente.apellido.toUpperCase();


          //let datePipe = new DatePipe('es');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        return response;
      })
    );
  }


  // crear cliente
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any)=> response.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
          )
          return throwError(e);
      })
    );
  }
  // obtener cliente por id
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Error al editar',
          e.error.mensaje,
          'error'
          )
          return throwError(e);
      })
    );
  }
// actualizar cliente por id
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
          )
          return throwError(e);
      })
    );
  }
  //eliminar cliente por id
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
          )
          return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>>{

    let formData = new FormData;
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
