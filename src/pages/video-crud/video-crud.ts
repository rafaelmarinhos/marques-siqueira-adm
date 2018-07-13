import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoModel } from '../../models/video.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-video-crud',
  templateUrl: 'video-crud.html',
})
export class VideoCrudPage {

  public isEdit: boolean;
  public video: VideoModel;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public DB: AngularFirestore) {

    this.video = this.navParams.data.video;
    this.createForm(this.video);
  }

  createForm(video: VideoModel) {
    if (!video) {
      this.isEdit = false;
      this.form = this.formBuilder.group({
        titulo: ['', Validators.required],
        descricao: [''],
        url: ['', Validators.required]
      });
    } else {
      this.isEdit = true;
      this.form = this.formBuilder.group({
        titulo: [video.titulo, Validators.required],
        descricao: [video.descricao],
        url: [video.url, Validators.required]
      });
    }
  }

  save() {
    let id = this.getId();

    let url = this.form.controls['url'].value as string;
    let splited = url.split("watch?v=");
    let id_video = `http://www.youtube.com/embed/${splited[1]}?origin=http://example.com`;

    this.DB.collection<VideoModel>('videos').doc(id).set({
      id: id,
      titulo: this.form.controls['titulo'].value,
      descricao: this.form.controls['descricao'].value,
      url: this.form.controls['url'].value,
      id_video: id_video
    });

    this.navCtrl.pop();
  }

  delete() {
    this.DB.collection<VideoModel>('videos').doc(this.video.id).delete();
    this.navCtrl.pop();
  }

  getId(): string {
    if (!this.video) {
      return this.DB.createId();
    } else {
      return this.video.id;
    }
  }
}
