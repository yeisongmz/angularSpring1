import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = 'Iniciar sesion';
  usuario: Usuario;
  autenticado: boolean = false;
  constructor(private authService: AuthService, private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    //console.log('se inicia el componente login: '+ this.authService.isAuthenticated())
    if (this.authService.isAuthenticated()) {

      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login() {
    //console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Username o password vacías', 'error');
    }
    this.authService.login(this.usuario)
      .subscribe(response => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        this.router.navigate(['/clientes']);
        let usuario = this.authService.usuario;

        Swal.fire(
          'Login',
          `Hola ${usuario.username}, has iniciado con exito`,
          'success'
        );

      }, error => {
        if (error.status == 400) {
          Swal.fire(
            'Error Login',
            `Usuario o clave incorrectas`,
            'error'
          );
        }
      })
  }

}
