import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Direccion } from '../models/Direccion';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  submitted = false;
  public FormRegistroPedido!: FormGroup;
  
  @Output() estado = new EventEmitter<string>();
  @Output() direccionCom = new EventEmitter<Direccion>()
  @Output() direccionEnt = new EventEmitter<Direccion>()
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    console.log("A")
    this.FormRegistroPedido = this.formBuilder.group({
      Descripcion:new FormControl('',[Validators.required,Validators.pattern('[A-Z, a-z]{4,50}')]),
      CalleComercio: new FormControl('', 
        [Validators.required, 
          Validators.pattern('[A-Z, a-z]{4,50}')]),
      NumeroComercio: new FormControl(null,
        [Validators.required,
          Validators.pattern('[0-9]{1,5}')]),
      CiudadComercio: new FormControl(true, [Validators.required]),
      ReferenciaComercio: new FormControl('', [Validators.pattern('[A-Z, a-z, 0-9]{1,100}')]),
      CalleEntrega: new FormControl('', 
      [Validators.required, 
        Validators.pattern('[A-Z, a-z]{4,50}')]),
    NumeroEntrega: new FormControl(null,
      [Validators.required,
        Validators.pattern('[0-9]{1,5}')]),
    CiudadEntrega: new FormControl(true, [Validators.required]),
    ReferenciaEntrega: new FormControl('', [Validators.pattern('[A-Z, a-z, 0-9]{1,100}')])
    });
  }

  direccionEntrega = new Direccion();
  direccionComercio = new Direccion();
  continuar(){
    if(!this.FormRegistroPedido.invalid){
      this.direccionEntrega.Calle = this.FormRegistroPedido.value.CalleEntrega;
      this.direccionEntrega.Numero = this.FormRegistroPedido.value.NumeroEntrega;
      this.direccionEntrega.Ciudad = this.FormRegistroPedido.value.CiudadEntrega;
      this.direccionEntrega.Referencia = this.FormRegistroPedido.value.Referencia;

      this.direccionComercio.Calle = this.FormRegistroPedido.value.CalleComercio;
      this.direccionComercio.Numero = this.FormRegistroPedido.value.NumeroComercio;
      this.direccionComercio.Ciudad = this.FormRegistroPedido.value.CiudadComercio;
      this.direccionComercio.Referencia = this.FormRegistroPedido.value.ReferenciaComercio;

      this.direccionCom.emit(this.direccionComercio);
      this.direccionEnt.emit(this.direccionEntrega);
      this.estado.emit('P')


    }else{
   
    }  this.submitted = true;

  }
  
  atras(){}
  validezCampo(campo:string){
    if( (this.FormRegistroPedido.controls[campo].touched || this.submitted)
          && this.FormRegistroPedido.controls[campo].errors)
    return 'is-invalid';

    else return '';
  }
  errorDePatron(campo:string){
    if( (this.FormRegistroPedido.controls[campo].touched || this.submitted)
          && this.FormRegistroPedido.controls[campo].hasError('pattern'))
    return true;

    else return false;
  }
  errorDeRequerido(campo:string){
    if( (this.FormRegistroPedido.controls[campo].touched || this.submitted)
          && this.FormRegistroPedido.controls[campo].hasError('required'))
    return true;

    else return false;
  }

  validateSize(event:any):void {
    const file:File = event.target.files[0];
    if (file.size > 5000000) // Validar si el tamaño es mayor a 5MB (en bytes)
      // Mostrar mensaje de error o deshabilitar el botón de carga
      return;
  }
  

  
}
