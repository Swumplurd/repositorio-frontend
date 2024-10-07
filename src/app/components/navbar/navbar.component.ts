import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [AuthService]
})
export class NavbarComponent {
  isLoginPage: boolean = false
  currentUser: string = ""

  constructor(public loginService: AuthService, public router: Router) { }

  ngOnInit() {
    this.isLoginPage = this.router.url == "/"

    if (this.loginService.isLoggedIn()) {
      this.currentUser = localStorage.getItem("usuario") || ""
      this.isLoginPage && this.router.navigate(["/usuarios"])
    } else {
      localStorage.removeItem("isLoggedin")
      localStorage.removeItem("usuarios")
    }
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/']);
  }
}
