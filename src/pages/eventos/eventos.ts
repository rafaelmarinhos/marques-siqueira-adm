import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoModel } from '../../models/evento.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { EventoCrudPage } from '../evento-crud/evento-crud';

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  private eventosColecao: AngularFirestoreCollection<EventoModel>;
  eventos: Observable<EventoModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.eventosColecao = DB.collection<EventoModel>('eventos');
    this.eventos = this.eventosColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(EventoCrudPage);
  }

  edit(evento: EventoModel) {
    this.navCtrl.push(EventoCrudPage, { evento: evento })
  }
}
