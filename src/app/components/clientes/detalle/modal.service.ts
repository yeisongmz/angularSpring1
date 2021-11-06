import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal: boolean = false;

  private _notificarUplaoad = new EventEmitter<any>();

  constructor() { }

  get notificacionUpload(): EventEmitter<any>{
    return this._notificarUplaoad;
  }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
