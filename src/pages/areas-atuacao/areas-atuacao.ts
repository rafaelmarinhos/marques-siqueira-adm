import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { AreaAtuacaoCrudPage } from '../area-atuacao-crud/area-atuacao-crud';
import { AreaAtuacaoModel } from '../../models/area.model';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Component({
  selector: 'page-areas-atuacao',
  templateUrl: 'areas-atuacao.html',
})
export class AreasAtuacaoPage {

  private areasColecao: AngularFirestoreCollection<AreaAtuacaoModel>;
  areas: Observable<AreaAtuacaoModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.areasColecao = DB.collection<AreaAtuacaoModel>('areas');
    this.areas = this.areasColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(AreaAtuacaoCrudPage);
  }

  edit(area: AreaAtuacaoModel) {
    this.navCtrl.push(AreaAtuacaoCrudPage, { area: area })
  }
}
