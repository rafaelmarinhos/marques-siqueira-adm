import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AreaAtuacaoModel } from '../../models/area.model';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

@Component({
  selector: 'page-area-atuacao-crud',
  templateUrl: 'area-atuacao-crud.html',
})
export class AreaAtuacaoCrudPage {

  @ViewChild('fileInput') fileInput: ElementRef;

  public isEdit: boolean;
  public area: AreaAtuacaoModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.area = this.navParams.data.area;
    this.createForm(this.area);
  }

  createForm(area: AreaAtuacaoModel) {
    if (!area) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        subtitulo: [''],
        descricao: ['', Validators.required],
        servicos: [''],
        imagem: ['']
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        nome: [area.nome, Validators.required],
        subtitulo: [area.subtitulo, Validators.required],
        descricao: [area.descricao, Validators.required],
        servicos: [area.servicos, Validators.required],
        imagem: ['']
      });
    }
  }

  save() {
    let id = this.getId();
    let imagem: any;

    if (this.form.controls['imagem'].value) {
      imagem = this.form.controls['imagem'].value;
    } else if (this.area) {
      imagem = this.area.imagem;
    } else {
      imagem = '';
    }

    this.DB.collection<AreaAtuacaoModel>('areas').doc(id).set({
      id: id,
      nome: this.form.controls['nome'].value,
      subtitulo: this.form.controls['subtitulo'].value,
      descricao: this.form.controls['descricao'].value,
      servicos: this.form.controls['servicos'].value,
      imagem: imagem
    });

    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<AreaAtuacaoModel>('areas').doc(this.area.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.area) {
      return this.DB.createId();
    } else {
      return this.area.id;
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('imagem').setValue(reader.result)
      };
    }
  }
}
