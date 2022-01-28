import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {AlertService} from "../_alert";
import {TokenStorageService} from "../_services/token-storage.service";
import {AuthRequest} from "../_models/auth-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

    this.authService.register(authRequest).subscribe(
      data => {
        console.log(data);
        this.alertService.success('Registration successful', this.alertOptions);
        this.router.navigate(['../login'], { relativeTo: this.activatedRoute});
    },
      (error) => {
        console.log(error.error);
        this.alertService.error(error.error.message);
    }
    )
  }

}
