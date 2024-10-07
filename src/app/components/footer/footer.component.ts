import { Component } from '@angular/core';
import { FechaComponent } from "../fecha/fecha.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FechaComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
