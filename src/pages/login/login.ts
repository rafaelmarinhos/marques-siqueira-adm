import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController) {

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  login() {

    this.afAuth.auth
      .signInWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        let alert = this.alertCtrl.create({
          title: 'Autenticação Inválida',
          subTitle: 'Usuário ou senha incorretos.',
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
