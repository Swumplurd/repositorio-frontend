import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {
    const isSessionActive = localStorage.getItem("isLoggedIn");
    this.isAuthenticated = isSessionActive === "true";
    this.isLoggedIn()
  }

  login(usuario: string, password: string): boolean {
    if (usuario === "Administrador" && password === "Admin123") {
      this.isAuthenticated = true;
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("usuario", usuario)
      return true;
    }
    return false;
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  
  logout() {
    this.isAuthenticated = false;
    localStorage.setItem("isLoggedIn", "false")
  }
}
