import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {take} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute) {
    this.getAuthorizationCode();
  }

  ngOnInit() {
    this.authService.getToken().pipe(take(1)).subscribe((tokens) => {
      console.log('tokens ==== ', tokens);
      if((tokens as any)?.id_token){
        sessionStorage.setItem('id_token', (tokens as any).id_token);
        sessionStorage.setItem('refresh_token', (tokens as any).refresh_token);
      }
    });
  }

  getAuthorizationCode() {
    this.activateRoute.queryParams.subscribe((params) => {
      if(params?.['code']){
        this.authService.code = params['code'];
      }
    })
  }
}
