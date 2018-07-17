import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClienteModel } from '../../models/cliente.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ClienteCrudPage } from '../cliente-crud/cliente-crud';

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  private clientesColecao: AngularFirestoreCollection<ClienteModel>;
  clientes: Observable<ClienteModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.clientesColecao = DB.collection<ClienteModel>('clientes', ref => ref.orderBy("nome"));
    this.clientes = this.clientesColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(ClienteCrudPage);
  }

  edit(cliente: ClienteModel) {
    this.navCtrl.push(ClienteCrudPage, { cliente: cliente })
  }
}
