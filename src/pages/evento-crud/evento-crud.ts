import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoModel } from '../../models/evento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-evento-crud',
  templateUrl: 'evento-crud.html',
})
export class EventoCrudPage {

  @ViewChild('fileInput') fileInput: ElementRef;

  public isEdit: boolean;
  public evento: EventoModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.evento = this.navParams.data.evento;
    this.createForm(this.evento);
  }

  createForm(evento: EventoModel) {
    if (!evento) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        titulo: ['', Validators.required],
        data: [''],
        descricao_resumida: ['', Validators.required],
        descricao_completa: ['', Validators.required],
        imagem: ['']
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        titulo: [evento.titulo, Validators.required],
        data: [evento.data],
        descricao_resumida: [evento.descricao_resumida, Validators.required],
        descricao_completa: [evento.descricao_completa, Validators.required],
        imagem: ['']
      });
    }
  }

  save() {
    let id = this.getId();
    let imagem: any;

    if (this.form.controls['imagem'].value) {
      imagem = this.form.controls['imagem'].value;
    } else if (this.evento) {
      imagem = this.evento.imagem;
    } else {
      imagem = '';
    }

    this.DB.collection<EventoModel>('eventos').doc(id).set({
      id: id,
      titulo: this.form.controls['titulo'].value,
      data: this.form.controls['data'].value,
      descricao_resumida: this.form.controls['descricao_resumida'].value,
      descricao_completa: this.form.controls['descricao_completa'].value,
      imagem: imagem
    });

    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<EventoModel>('eventos').doc(this.evento.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.evento) {
      return this.DB.createId();
    } else {
      return this.evento.id;
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
