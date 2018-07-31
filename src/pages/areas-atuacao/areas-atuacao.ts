import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-areas-atuacao',
  templateUrl: 'areas-atuacao.html',
})
export class AreasAtuacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreasAtuacaoPage');
  }
}
