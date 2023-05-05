import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoComponent } from './pedido/pedido.component';
import { FormaDePagoComponent } from './forma-de-pago/forma-de-pago.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormaDeEnvioComponent } from './forma-de-envio/forma-de-envio.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    FormaDePagoComponent,
    FormaDeEnvioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
