import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FuncionarioModel } from '../../models/funcionario.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FuncionarioCrudPage } from '../funcionario-crud/funcionario-crud';

@Component({
  selector: 'page-funcionarios',
  templateUrl: 'funcionarios.html',
})
export class FuncionariosPage {

  private funcionariosColecao: AngularFirestoreCollection<FuncionarioModel>;
  funcionarios: Observable<FuncionarioModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.funcionariosColecao = DB.collection<FuncionarioModel>('funcionarios');
    this.funcionarios = this.funcionariosColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(FuncionarioCrudPage);
  }

  edit(funcionario: FuncionarioModel) {
    this.navCtrl.push(FuncionarioCrudPage, { funcionario: funcionario })
  }
}