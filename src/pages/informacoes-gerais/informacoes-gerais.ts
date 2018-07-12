import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { InformacoesGeraisModel } from '../../models/informacoes.model';
import { Constantes } from '../../global/constantes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-informacoes-gerais',
  templateUrl: 'informacoes-gerais.html',
})
export class InformacoesGeraisPage {

  private informacoesGeraisDoc: AngularFirestoreDocument<InformacoesGeraisModel>;
  informacoesGerais: Observable<InformacoesGeraisModel>;

  public form: FormGroup;

  constructor(public DB: AngularFirestore, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.informacoesGeraisDoc = this.DB.doc<InformacoesGeraisModel>('/informacoes-gerais/' + Constantes.informacoes_gerais_id);
    this.informacoesGerais = this.informacoesGeraisDoc.valueChanges();

    this.form = this.formBuilder.group({
      endereco: [''],
      telefone_goiania: [''],
      telefone_brasilia: [''],
      email: [''],
      horario_funcionamento: ['']
    });
  }

  save() {
    this.informacoesGeraisDoc.update({
      endereco: this.form.controls['endereco'].value,
      telefone_goiania: this.form.controls['telefone_goiania'].value,
      telefone_brasilia: this.form.controls['telefone_brasilia'].value,
      email: this.form.controls['email'].value,
      horario_funcionamento: this.form.controls['horario_funcionamento'].value
    }).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Tudo certo :)',
        subTitle: 'As informações gerais da empresa foram atualizadas com sucesso.',
        buttons: ['OK']
      });
      alert.present();
    }).catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Erro :(',
        subTitle: 'Erro ao atualizat informações gerais da empresa.',
        buttons: ['OK']
      });
      alert.present();
    });
  }
}
