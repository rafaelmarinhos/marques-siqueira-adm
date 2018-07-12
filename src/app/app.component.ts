import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPaneProvider } from '../providers/split-pane/split-pane';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { InformacoesGeraisPage } from '../pages/informacoes-gerais/informacoes-gerais';
import { NoticiasPage } from '../pages/noticias/noticias';
import { ClientesPage } from '../pages/clientes/clientes';
import { VideosPage } from '../pages/videos/videos';
import { EventosPage } from '../pages/eventos/eventos';
import { FuncionariosPage } from '../pages/funcionarios/funcionarios';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public splitPaneProvider: SplitPaneProvider) {

    this.initializeApp();

    this.pages = [
      { icon: 'md-home', title: 'Home', component: HomePage },      
      { icon: 'md-information-circle', title: 'Informações Gerais', component: InformacoesGeraisPage },
      { icon: 'md-paper', title: 'Notícias', component: NoticiasPage },
      { icon: 'md-briefcase', title: 'Clientes', component: ClientesPage },
      { icon: 'logo-youtube', title: 'Vídeos', component: VideosPage },  
      { icon: 'md-star', title: 'Eventos', component: EventosPage },
      { icon: 'md-people', title: 'Funcionários', component: FuncionariosPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  spliPaneIsEnable() {
    return this.splitPaneProvider.spliPaneIsEnable();
  }
}
