import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forma-de-envio',
  templateUrl: './forma-de-envio.component.html',
  styleUrls: ['./forma-de-envio.component.css']
})
export class FormaDeEnvioComponent implements OnInit {

  public FormRegistroEnvioHorario!: FormGroup;
  habilitar = false;
  formaEnvio = "";
  submitted = false;

  constructor( private formBuilder: FormBuilder) { }

  @Output() estado = new EventEmitter<string>();
  @Output() metodoenvio = new EventEmitter<string>();

  ngOnInit(): void {
    this.FormRegistroEnvioHorario = this.formBuilder.group({
      FechaRecepcion:  new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,2}[-/][0-9]{1,2}[-/][0-9]{4}')]),
      HoraRecepcion:  new FormControl('',[Validators.required, Validators.pattern('([0-1]?[0-9]|2[0-3]):[0-5][0-9]')]),
    })
  }
 
  validezCampo(campo:string,form:FormGroup){
    if( (form.controls[campo].touched || this.submitted)
          && form.controls[campo].errors)
    return 'is-invalid';

    else return '';
  }

  onSelected2(value:string): void{
    this.formaEnvio = value;
    if (value == '0') this.habilitar = true;
    
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
    
  estadoForm()
  {
    if(this.formaEnvio == '0')return false;
    else if (this.formaEnvio == '1') return this.FormRegistroEnvioHorario.invalid;
    else return true;
  }

 continuar(){
        if(this.formaEnvio == "0")this.metodoenvio.emit("Lo Antes Posible")
        if(this.formaEnvio == "1")this.metodoenvio.emit("Fecha y Hora Especifica")
        this.estado.emit('F')

  }
  
  atras(){
    this.estado.emit('P')
  }
 
}
