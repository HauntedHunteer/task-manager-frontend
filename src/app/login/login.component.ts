import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {AlertService} from "../_alert";
import {AuthRequest} from "../_models/auth-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() : { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  onSubmit() {
    this.alertService.clear();
    this.submitted = true;

    if (this.form!.invalid) {
      return;
    }

    const authRequest : AuthRequest = {
      username: this.f['username'].value,
      password: this.f['password'].value
    };

    this.authService.login(authRequest).subscribe(
      data => {
        console.log(data);
        this.tokenStorageService.saveToken(data.jwtToken);
        this.tokenStorageService.saveUser(data);

        this.alertService.success('Logged successfully', this.alertOptions);
        this.router.navigate(['../dashboard'], { relativeTo: this.activatedRoute});
      },
      (error) => {
        console.log(error.error);
        this.alertService.error(error.error.message);
      }
    )
  }

}
