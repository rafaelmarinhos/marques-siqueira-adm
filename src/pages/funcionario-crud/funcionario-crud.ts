import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FuncionarioModel } from '../../models/funcionario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-funcionario-crud',
  templateUrl: 'funcionario-crud.html',
})
export class FuncionarioCrudPage {

  @ViewChild('fileInput') fileInput: ElementRef;

  public isEdit: boolean;
  public funcionario: FuncionarioModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.funcionario = this.navParams.data.funcionario;
    this.createForm(this.funcionario);
  }

  createForm(funcionario: FuncionarioModel) {
    if (!funcionario) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        OAB: [''],
        descricao: ['', Validators.required],
        imagem: ['']
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        nome: [funcionario.nome, Validators.required],
        OAB: [funcionario.OAB],
        descricao: [funcionario.descricao, Validators.required],
        imagem: ['']
      });
    }
  }

  save() {
    let id = this.getId();
    let imagem: any;

    if (this.form.controls['imagem'].value) {
      imagem = this.form.controls['imagem'].value;
    } else if (this.funcionario) {
      imagem = this.funcionario.imagem;
    } else {
      imagem = '';
    }

    this.DB.collection<FuncionarioModel>('funcionarios').doc(id).set({
      id: id,
      nome: this.form.controls['nome'].value,
      OAB: this.form.controls['OAB'].value,
      descricao: this.form.controls['descricao'].value,
      imagem: imagem
    });

    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<FuncionarioModel>('funcionarios').doc(this.funcionario.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.funcionario) {
      return this.DB.createId();
    } else {
      return this.funcionario.id;
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
