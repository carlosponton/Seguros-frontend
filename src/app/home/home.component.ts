import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Policies } from '../models/policies.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private policies: Policies;
  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.rest.getPolicies().subscribe(policies => {
      this.policies = policies;
    })
  }

}
