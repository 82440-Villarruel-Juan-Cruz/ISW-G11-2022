import { Component } from '@angular/core';
import { Direccion } from './models/Direccion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISW-G11-2023-Tp-6';

  EstadosPedido = {
    I:'Inicio',
    P: 'Pago',
    E: 'Envio',
    F: 'Final'

  }

  estadoPedido = 'I';
  metodoPago = "";
  montoTotal = 0;
  metodoEnvio = "";
  direccionComercio = new Direccion();
  direccionEntrega = new Direccion();

}
