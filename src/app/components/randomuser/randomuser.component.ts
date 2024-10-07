import { Component, ElementRef, ViewChild } from '@angular/core';
import { RandomuserService } from '../../services/randomuser/randomuser.service';
import { RandomUser } from '../../interface/randomuser/randomuser';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-randomuser',
  standalone: true,
  imports: [NgFor, NavbarComponent, NavbarComponent, NgClass, NgIf, RouterOutlet],
  templateUrl: './randomuser.component.html',
  styleUrl: './randomuser.component.css'
})
export class RandomuserComponent {
  usuarios: RandomUser[] = []
  selectedUser: RandomUser | undefined

  @ViewChild('modal') modal!: ElementRef;

  constructor(private randomUserService: RandomuserService, private router: Router) { }

  ngOnInit() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios")!) || []
  }

  obtenerUsuario() {
    this.randomUserService.getRandomUser().subscribe((data: any) => {
      this.usuarios.push(data)
      localStorage.setItem("usuarios", JSON.stringify([...this.usuarios]))
    })
  }

  goToEdit(usuario: RandomUser) {
    this.router.navigate([`usuarios/editar/${usuario.results[0].login.uuid.toString()}`])
  }

  openModal(usuario?: RandomUser) {
    if (usuario && usuario.results && usuario.results.length > 0) {
      this.selectedUser = usuario;
      console.log(this.selectedUser);
    } else {
      console.error('Usuario inválido o sin resultados');
      return;
    }

    const modalElement = this.modal.nativeElement;
    modalElement.classList.toggle('hidden');
  }

  closeModal() {
    const modalElement = this.modal.nativeElement;
    modalElement.classList.toggle('hidden');
  }
}
