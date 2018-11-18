import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../models/clients.model';
import { RestService } from '../rest.service';
import { Types } from '../models/types.model';
import { Policies } from '../models/policies.model';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css']
})
export class CreatePolicyComponent implements OnInit {

  private alert = new Subject<string>();

  staticAlertClosed = false;
  alertMessage: string;
  typeAlert = "error";
  
  private contactForm: FormGroup;
  private clients: Clients;
  private types: Types;
  private policy: Policies;
  private id: number;
  private policyValid = {
    clientId: false,
    danger: false,
    date: false,
    description: false,
    name: false,
    period: false,
    price: false,
    typeId: false
  }
  constructor(
    private rest: RestService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.contactForm = this.createFormGroup();
    this.rest.getClients().subscribe( (clients: Clients) => {
      this.clients = clients;
    });
    this.rest.getTypes().subscribe( (types: Types) => {
      this.types = types;
    });

    this.initAlertMessage();

    this.route.params.subscribe((params)=>{
      this.id = params.id;
      this.rest.getPolicy(params.id).subscribe((policy: Policies) => {
        this.policy = policy;
      })
    })
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      period: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      danger: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]),
      typeId: new FormControl('', Validators.required),
      price:new FormControl('', [Validators.required, Validators.min(0)]),
      clientId: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if(this.contactForm.valid){
      this.validForm(this.contactForm);
      this.policy = JSON.parse(JSON.stringify(this.contactForm.value));
      this.policy.date = new Date(this.contactForm.value.date.year, this.contactForm.value.date.month, this.contactForm.value.date.day).toJSON();
      this.rest.postPolicy(this.policy).subscribe(v => {
        if(v){
          this.typeAlert = "success";
          this.changeAlertMessage('Sus datos se guardaron con éxito.');
          this.contactForm.reset();
        }else{
          this.typeAlert = "danger";
          this.changeAlertMessage('Ocurrió un error al intentar enviar sus datos. Vuelva a intentarlo.');
        }
      },
      error => {
        this.typeAlert = "danger";
        this.changeAlertMessage('Ocurrió un error al intentar enviar sus datos. Vuelva a intentarlo.');
      });
    }else{
      this.validForm(this.contactForm);
    }
  }

  changeAlertMessage(message: string) {
    this.alert.next(message);
  }

  initAlertMessage(){
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this.alert.subscribe((message) => this.alertMessage = message);
    this.alert.pipe(
      debounceTime(5000)
    ).subscribe(() => this.alertMessage = null);
  }

  validForm(form: FormGroup){
    if(!form.get('name').valid){
      this.policyValid.name = true;
    }else {
      this.policyValid.name = false;      
    }

    if(!form.get('description').valid){
      this.policyValid.description = true;
    }else {
      this.policyValid.description = false;      
    }

    if(!form.get('date').valid){
      this.policyValid.date = true;
    }else {
      this.policyValid.date = false;      
    }

    if(!form.get('period').valid){
      this.policyValid.period = true;
    }else {
      this.policyValid.period = false;      
    }

    if(!form.get('danger').valid){
      this.policyValid.danger = true;
    }else {
      this.policyValid.danger = false;      
    }

    if(!form.get('typeId').valid){
      this.policyValid.typeId = true;
    }else {
      this.policyValid.typeId = false;      
    }

    if(!form.get('price').valid){
      this.policyValid.price = true;
    }else {
      this.policyValid.price = false;      
    }

    if(!form.get('clientId').valid){
      this.policyValid.clientId = true;
    }else {
      this.policyValid.clientId = false;      
    }
  }
}
