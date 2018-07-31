import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Environment } from './app.env';
import { SplitPaneProvider } from '../providers/split-pane/split-pane';

// Pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { InformacoesGeraisPage } from '../pages/informacoes-gerais/informacoes-gerais';
import { NoticiasPage } from '../pages/noticias/noticias';
import { NoticiasCrudPage } from '../pages/noticias-crud/noticias-crud';
import { ClientesPage } from '../pages/clientes/clientes';
import { ClienteCrudPage } from '../pages/cliente-crud/cliente-crud';
import { VideosPage } from '../pages/videos/videos';
import { VideoCrudPage } from '../pages/video-crud/video-crud';
import { EventosPage } from '../pages/eventos/eventos';
import { EventoCrudPage } from '../pages/evento-crud/evento-crud';
import { FuncionariosPage } from '../pages/funcionarios/funcionarios';
import { FuncionarioCrudPage } from '../pages/funcionario-crud/funcionario-crud';
import { AreasAtuacaoPage } from '../pages/areas-atuacao/areas-atuacao';
import { AreaAtuacaoCrudPage } from '../pages/area-atuacao-crud/area-atuacao-crud';
import { PremiosPage } from '../pages/premios/premios';
import { PremioCrudPage } from '../pages/premio-crud/premio-crud';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InformacoesGeraisPage,
    NoticiasPage,
    NoticiasCrudPage,
    ClientesPage,
    ClienteCrudPage,
    VideosPage,
    VideoCrudPage,
    EventosPage,
    EventoCrudPage,
    FuncionariosPage,
    FuncionarioCrudPage,
    AreasAtuacaoPage,
    AreaAtuacaoCrudPage,
    PremiosPage,
    PremioCrudPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    InformacoesGeraisPage,
    NoticiasPage,
    NoticiasCrudPage,
    ClientesPage,
    ClienteCrudPage,
    VideosPage,
    VideoCrudPage,
    EventosPage,
    EventoCrudPage,
    FuncionariosPage,
    FuncionarioCrudPage,
    AreasAtuacaoPage,
    AreaAtuacaoCrudPage,
    PremiosPage,
    PremioCrudPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SplitPaneProvider
  ]
})
export class AppModule { }
