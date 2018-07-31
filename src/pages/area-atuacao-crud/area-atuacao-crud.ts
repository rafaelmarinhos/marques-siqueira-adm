import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-area-atuacao-crud',
  templateUrl: 'area-atuacao-crud.html',
})
export class AreaAtuacaoCrudPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreaAtuacaoCrudPage');
  }
}
