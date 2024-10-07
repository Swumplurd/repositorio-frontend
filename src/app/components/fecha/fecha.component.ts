import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fecha',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './fecha.component.html',
  styleUrl: './fecha.component.css',
  providers: [DatePipe]
})
export class FechaComponent {
  fecha: string = "";
  private interval: any;

  constructor(private datePipe: DatePipe) {
    this.actualizarFecha();
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.actualizarFecha();
    }, 60000);
  }

  actualizarFecha(): void {
    this.fecha = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm')!;
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
