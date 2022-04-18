import { Component } from "@angular/core";
import { AuthService } from "../../Services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component(
  {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  }
)
export class HeaderComponent {
  title: string = 'App Angular';

  constructor(private authService: AuthService, private router: Router) {}

  logout():void{
    this.authService.logout();
    Swal.fire('Cierre de sessión', 'Ha cerrado la sessión', 'success');
    this.router.navigate(['/login']);

  }
  
}
