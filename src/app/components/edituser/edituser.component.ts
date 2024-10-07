import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RandomUser } from '../../interface/randomuser/randomuser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [NavbarComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  id: string = "";
  user: RandomUser[] = []
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id || "";
    });

    this.user = JSON.parse(localStorage.getItem("usuarios") || "").filter((user: RandomUser) => user.results[0].login.uuid === this.id)
    this.editForm = this.fb.group({
      title: [this.user[0].results[0].name.title, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      first: [this.user[0].results[0].name.first, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      last: [this.user[0].results[0].name.last, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      city: [this.user[0].results[0].location.city, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      state: [this.user[0].results[0].location.state, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      country: [this.user[0].results[0].location.country, [Validators.required, Validators.pattern('^[a-zA-Z \u0600-\u06FF\s-]+$')]],
      postcode: [this.user[0].results[0].location.postcode, [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: [this.user[0].results[0].email, [Validators.required, Validators.email]],
    });
  }

  editUser(): void {
    console.log(this.editForm);
    if (this.editForm.valid) {
      const usuariosStr = localStorage.getItem("usuarios");
      let usuarios: RandomUser[] = usuariosStr ? JSON.parse(usuariosStr) : [];
      let index = usuarios.findIndex((usuario: RandomUser) => usuario.results[0].login.uuid === this.user[0].results[0].login.uuid);
      
      if (index !== -1) {
        usuarios[index].results[0].name = {
          title: this.editForm.value.title,
          first: this.editForm.value.first,
          last: this.editForm.value.last,
        };
        usuarios[index].results[0].location = {
          ...usuarios[index].results[0].location,
          city: this.editForm.value.city,
          state: this.editForm.value.state,
          country: this.editForm.value.country,
          postcode: this.editForm.value.postcode,
        };
        usuarios[index].results[0].email = this.editForm.value.email;
  
        // Guardar el arreglo actualizado en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire("Usuario editado", "", "success");
      }
    } else {
      Swal.fire("Una o más validaciones han fallado", "", "error");
    }
  }
}
