import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { first } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date_of_birth: ['', Validators.required]
  });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.dismiss();
                this.authenticationService.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
                .subscribe();
                //this.loginModal();
            },
            error => {
              this.loading = false;
            });
}

async loginModal() {
  const modal = await this.modalController.create({
    component: LoginComponent
  });
  modal.present();
}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }
}
