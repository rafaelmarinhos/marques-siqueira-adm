import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VideoModel } from '../../models/video.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { VideoCrudPage } from '../video-crud/video-crud';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  private videosColecao: AngularFirestoreCollection<VideoModel>;
  videos: Observable<VideoModel[]>;

  constructor(public navCtrl: NavController, public DB: AngularFirestore) {

    // TODO: Ordenar por data de criação
    this.videosColecao = DB.collection<VideoModel>('videos');
    this.videos = this.videosColecao.valueChanges();
  }

  create() {
    this.navCtrl.push(VideoCrudPage);
  }

  edit(video: VideoModel) {
    this.navCtrl.push(VideoCrudPage, { video: video })
  }
}