import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent, RegisterComponent } from './components';

@Component({
  selector: 'app-public',
  templateUrl: './public.page.html',
  styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

 async loginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent
    });
    modal.present();
  }
  async registerModal() {
    const modal = await this.modalController.create({
      component: RegisterComponent
    });
    modal.present();
  }

}
