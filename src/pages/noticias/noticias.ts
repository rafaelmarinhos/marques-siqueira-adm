import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { NoticiaModel } from '../../models/noticia.model';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { NoticiasCrudPage } from '../noticias-crud/noticias-crud';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  private noticiasColecao: AngularFirestoreCollection<NoticiaModel>;
  noticias: Observable<NoticiaModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.noticiasColecao = DB.collection<NoticiaModel>('noticias');
    this.noticias = this.noticiasColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(NoticiasCrudPage);
  }

  edit(noticia: NoticiaModel) {
    this.navCtrl.push(NoticiasCrudPage, { noticia: noticia })
  }
}
