import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PremioModel } from '../../models/premio.model';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

@Component({
  selector: 'page-premio-crud',
  templateUrl: 'premio-crud.html',
})
export class PremioCrudPage {

  @ViewChild('fileInput') fileInput: ElementRef;

  public isEdit: boolean;
  public premio: PremioModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.premio = this.navParams.data.premio;
    this.createForm(this.premio);
  }

  createForm(premio: PremioModel) {
    if (!premio) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        titulo: ['', Validators.required],
        anos: ['', Validators.required],
        instituicao: [''],
        descricao_resumida: ['', Validators.required],
        descricao_completa: ['', Validators.required],
        imagem: ['']
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        titulo: [premio.titulo, Validators.required],
        anos: [premio.anos, Validators.required],
        instituicao: [premio.instituicao],
        descricao_resumida: [premio.descricao_resumida, Validators.required],
        descricao_completa: [premio.descricao_completa, Validators.required],
        imagem: ['']
      });
    }
  }

  save() {
    let id = this.getId();
    let imagem: any;

    if (this.form.controls['imagem'].value) {
      imagem = this.form.controls['imagem'].value;
    } else if (this.premio) {
      imagem = this.premio.imagem;
    } else {
      imagem = '';
    }

    this.DB.collection<PremioModel>('premios').doc(id).set({
      id: id,
      titulo: this.form.controls['titulo'].value,
      anos: this.form.controls['anos'].value,
      instituicao: this.form.controls['instituicao'].value,
      descricao_resumida: this.form.controls['descricao_resumida'].value,
      descricao_completa: this.form.controls['descricao_completa'].value,
      imagem: imagem
    });

    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<PremioModel>('premios').doc(this.premio.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.premio) {
      return this.DB.createId();
    } else {
      return this.premio.id;
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
