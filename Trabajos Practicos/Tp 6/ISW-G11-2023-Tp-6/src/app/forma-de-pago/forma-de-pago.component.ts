import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { count } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forma-de-pago',
  templateUrl: './forma-de-pago.component.html',
  styleUrls: ['./forma-de-pago.component.css']
})
export class FormaDePagoComponent implements OnInit {

  public FormRegistroPagoEfectivo!: FormGroup;
  public FormRegistroPagoTarjeta!: FormGroup;
  public FormRegistroPaso!: FormGroup;

  metodoPago = "";
  submitted = false;
  tarjetaValidada = false ;
  montoEnvio = 100.00;
  distanciaEntreDomicilios = 20;
  precioXkilomentro = 5;
  precioProducto = 150;
  
  @Output() estado = new EventEmitter<string>();
  @Output() metodopago = new EventEmitter<string>();
  constructor( private formBuilder: FormBuilder) { }


  calculo():number {
    return this.distanciaEntreDomicilios * this.precioXkilomentro;
  }

  total():number{
    return this.calculo() + this.precioProducto;
  }

  atras (){
    this.estado.emit('I')
  }

  continuar(){
    if(this.metodoPago == "0")this.metodopago.emit("Efectivo")
    if(this.metodoPago == "1")this.metodopago.emit("Tarjeta")


    this.estado.emit('E')

  }

  ngOnInit(): void {
    this.FormRegistroPaso = this.formBuilder.group({
      FormaPago: new FormControl(true,[Validators.required]),
      TipoEnvio: new FormControl(true,[Validators.required]),
    })

    this.FormRegistroPagoTarjeta = this.formBuilder.group({
      TotalAPagar: new FormControl(''),
      NumeroTarjeta: new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}'), ]),
      NombreTitularTarjeta: new FormControl('',  [Validators.required, Validators.pattern('[A-Z, a-z]{4,50}')]),
      ApellidoTitularTarjeta: new FormControl('',  [Validators.required, Validators.pattern('[A-Z, a-z]{4,50}')]),
      FechaVencimientoTarjeta: new FormControl('',[ Validators.required, Validators.pattern( '(0[1-9]|1[012])[-/][2-3][0-9]' ),]),
      CCV: new FormControl(null,[Validators.required, Validators.pattern('[0-9]{1,3}')]),
    })
    
    this.FormRegistroPagoEfectivo = this.formBuilder.group({
      MontoEfectivo:new FormControl(null, [Validators.required,Validators.max(30000), Validators.min(this.total())], ),
    })




  }

  onSelected(value:string): void{
    this.metodoPago = value;
  }

  validezCampo(campo:string,form:FormGroup){
    if( (form.controls[campo].touched || this.submitted)
          && form.controls[campo].errors)
    return 'is-invalid';

    else return '';
  }

  errorDePatron(campo:string,form:FormGroup){
    
    if( (form.controls[campo].touched || this.submitted)
          && form.controls[campo].hasError('pattern'))
    return true;

    else return false;
  }

  errorDeRequerido(campo:string,form:FormGroup){
    if( (form.controls[campo].touched || this.submitted)
          && form.controls[campo].hasError('required'))
    return true;

    else return false;
  }

  errorMonto(campo:string,form:FormGroup){
    if( (form.controls[campo].touched || this.submitted)
          && (form.controls[campo].hasError('min') || form.controls[campo].hasError('max')) )

    return true;

    else return false;
  }

  errorNumeroTarjeta(campo:string,form:FormGroup){
    if( (this.FormRegistroPagoTarjeta.controls[campo].touched || this.submitted)
          && !this.fValidarTarjeta(this.FormRegistroPagoTarjeta.controls[campo].value))
          {           

            this.tarjetaValidada  = false;
            return true;       

          }else{
            this.tarjetaValidada = true;
            return false;
          }

  }

  validateCredibCard(event:any):void{
    if(!this.tarjetaValidada){
      event.currentTarget.classList.add('is-invalid')

    }else{
      event.currentTarget.classList.remove('is-invalid')

    }
  }

  fValidarTarjeta(numero:string) {
    const booleano = false
    const codigo = numero;
    var msg = "Valor incorrecto";
    const MASTERCARD = /^5[1-5][0-9]{14}$/;
    if(this.luhn(codigo) && codigo != ""){
        if(codigo.match(MASTERCARD)){
            return false;
        }else{
          return true;
        }
        
    } else {
        return false;
    }
}

  luhn(value:string) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;
    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);
        if (bEven && (nDigit *= 2) > 9) nDigit -= 9; nCheck +=  nDigit; bEven = !bEven;
    }
    return (nCheck % 10) == 0;
}

validateForms(){
  console.log("a")
  var sum = 0;
  var variable = false;
  if(this.metodoPago != ''){
    switch (this.metodoPago) {
      case "0":
        if(this.FormRegistroPagoEfectivo.valid) 
        variable =  true
        break;
      case "1":
        if(this.FormRegistroPagoTarjeta.valid && this.tarjetaValidada ) 
        variable =  true
        break;
    }

  }
  return variable;
}
}
