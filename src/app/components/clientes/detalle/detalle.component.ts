import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../../Services/cliente.service';
import { ModalService } from '../../../Services/modal.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  public fotoSeleccionada: File;
  progreso: number = 0;




  constructor(
    private clienteService : ClienteService,
    public modalService: ModalService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {

  }


  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    //console.log(this.fotoSeleccionada);
    if( this.fotoSeleccionada.type.indexOf('image')<0){
      Swal.fire(
        'Error seleccionar foto',
        'El archivo debe ser una imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }

  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      Swal.fire(
        'Error al subir',
        'Debe seleccionar una foto',
        'error'
      )
    }else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).
      subscribe(
        event=>{
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificacionUpload.emit(this.cliente);

            Swal.fire(
              'La foto se ha subido correctamente',
              response.mensaje,
              'success'
            );
          }

          //this.cliente = cliente;


        }
      )
    }


  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
