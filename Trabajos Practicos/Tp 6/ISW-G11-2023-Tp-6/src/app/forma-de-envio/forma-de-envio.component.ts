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
  fechaHoy = new Date();

  getDate(weeks : number){
    var offset = this.fechaHoy.getTimezoneOffset()
    var fechareturn = new Date(this.fechaHoy.getTime() + (604800000 * weeks) - (offset*60*1000))
    return fechareturn.getMilliseconds()
  }

  

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

  errorDia(campo:string,form:FormGroup){
    console.log("a")

    if( (this.FormRegistroEnvioHorario.controls[campo].touched || this.submitted)
          && !this.validarDia(this.FormRegistroEnvioHorario.controls[campo].value))
          {   
            console.log("a")
            return true;}
    else{
      return false;
    }
  }
    
  errorHora(campo:string,form:FormGroup){

    if( (this.FormRegistroEnvioHorario.controls[campo].touched || this.submitted)
          && !this.validarHora(this.FormRegistroEnvioHorario.controls[campo].value))
          {   
            return true;
          }
    else{
      return false;
    }
  }

  validarHora(horario:string){
    const [hora,minutos] = horario.split(':');
    if(parseInt(hora) < 23 && parseInt(hora) > 8 )return true;
    else return false;
    
  }

  validarDia(fecha:string){
    var varibable = false;
    const [day, month, year] = fecha.split('/');
    const date = new Date(+year, parseInt(month) - 1, +day);
    if(date.getMilliseconds() > this.getDate(-1) && date.getMilliseconds() < this.getDate(1) ){
      varibable = true; 
    }
    return varibable
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
