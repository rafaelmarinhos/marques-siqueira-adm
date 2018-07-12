import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteModel } from '../../models/cliente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-cliente-crud',
  templateUrl: 'cliente-crud.html',
})
export class ClienteCrudPage {

  @ViewChild('fileInput') fileInput: ElementRef;

  public isEdit: boolean;
  public cliente: ClienteModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.cliente = this.navParams.data.cliente;
    this.createForm(this.cliente);
  }

  createForm(cliente: ClienteModel) {
    if (!cliente) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        imagem: ['']
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        nome: [this.cliente.nome, Validators.required],
        imagem: ['']
      });
    }
  }

  save() {
    let id = this.getId();
    let imagem: any;

    if (this.form.controls['imagem'].value) {
      imagem = this.form.controls['imagem'].value;
    } else if (this.cliente) {
      imagem = this.cliente.imagem;
    } else {
      imagem = '';
    }

    this.DB.collection<ClienteModel>('clientes').doc(id).set({
      id: id,
      nome: this.form.controls['nome'].value,
      imagem: imagem
    });
    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<ClienteModel>('clientes').doc(this.cliente.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.cliente) {
      return this.DB.createId();
    } else {
      return this.cliente.id;
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
