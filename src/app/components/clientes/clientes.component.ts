import { ClienteService } from "../../Services/cliente.service";
import { ModalService } from "../../Services/modal.service";
import { Component, OnInit } from "@angular/core";
import { Cliente } from "../../models/cliente";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado:Cliente;
  constructor(
    private clienteService: ClienteService,
    private activateRoute: ActivatedRoute,
    private modalService: ModalService,
    private authService: AuthService
    ) {}

  ngOnInit() {


    /* this.clienteService.getClientes(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent: tap 3');
        (response.content as Cliente []).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    )
    .subscribe(
      response => {
      this.clientes = response.content;
      //console.log(clientes);
    }); */

    this.activateRoute.paramMap.subscribe( params =>{
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.clienteService.getClientes(page)
      .subscribe(
        response => {
        this.clientes = response.content as Cliente [];
        this.paginador = response;
        //console.log(clientes);
      });
    });

    this.modalService.notificacionUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal=>{
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;

        }
        return clienteOriginal;
      })
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: "Eliminar cliente?",
      text: "Una vez eliminado no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire("Eliminado!", "El cliente fue eliminado.", "success");

          }
        );

      }
    });
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
