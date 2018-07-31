import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { PremioModel } from '../../models/premio.model';
import { PremioCrudPage } from '../premio-crud/premio-crud';

@Component({
  selector: 'page-premios',
  templateUrl: 'premios.html',
})
export class PremiosPage {

  private premiosColecao: AngularFirestoreCollection<PremioModel>;
  premios: Observable<PremioModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.premiosColecao = DB.collection<PremioModel>('premios');
    this.premios = this.premiosColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(PremioCrudPage);
  }

  edit(premio: PremioModel) {
    this.navCtrl.push(PremioCrudPage, { premio: premio })
  }
}
