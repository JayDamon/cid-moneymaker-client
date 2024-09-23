import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(
    private keycloakService: KeycloakService,
    protected readonly router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.keycloakService.logout();
  }

}
