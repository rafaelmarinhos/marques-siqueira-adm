import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { NoticiaModel } from '../../models/noticia.model';

@Component({
    selector: 'page-noticias-crud',
    templateUrl: 'noticias-crud.html',
})
export class NoticiasCrudPage {

    @ViewChild('fileInput') fileInput: ElementRef;

    public isEdit: boolean;
    public noticia: NoticiaModel;
    public form: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public DB: AngularFirestore) {

        this.noticia = this.navParams.data.noticia;
        this.createForm(this.noticia);
    }

    createForm(noticia: NoticiaModel) {
        if (!noticia) {
            this.isEdit = false;
            this.form = this.formBuilder.group({
                titulo: ['', Validators.required],
                data: [''],
                descricao_resumida: ['', Validators.required],
                descricao_completa: ['', Validators.required],
                fonte: [''],
                imagem: ['']
            });
        } else {
            this.isEdit = true;
            this.form = this.formBuilder.group({
                titulo: [this.noticia.titulo, Validators.required],
                data: [this.noticia.data],
                descricao_resumida: [this.noticia.descricao_resumida, Validators.required],
                descricao_completa: [this.noticia.descricao_completa, Validators.required],
                fonte: [this.noticia.fonte],
                imagem: ['']
            });
        }
    }

    save() {
        let id = this.getId();
        let imagem: any;

        if (this.form.controls['imagem'].value) {
            imagem = this.form.controls['imagem'].value;
        } else if (this.noticia) {
            imagem = this.noticia.imagem;
        } else {
            imagem = '';
        }

        this.DB.collection<NoticiaModel>('noticias').doc(id).set({
            id: id,
            titulo: this.form.controls['titulo'].value,
            data: this.form.controls['data'].value,
            descricao_resumida: this.form.controls['descricao_resumida'].value,
            descricao_completa: this.form.controls['descricao_completa'].value,
            fonte: this.form.controls['fonte'].value,
            imagem: imagem
        });
        this.navCtrl.pop();
    }

    delete() {
        this.DB.collection<NoticiaModel>('noticias').doc(this.noticia.id).delete();
        this.navCtrl.pop();
    }

    getId(): string {
        if (!this.noticia) {
            return this.DB.createId();
        } else {
            return this.noticia.id;
        }
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                this.form.get('imagem').setValue(reader.result)
            };
        }
    }
}
