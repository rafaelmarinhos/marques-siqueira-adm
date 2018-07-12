import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class SplitPaneProvider {

  splitPaneState: boolean;

  constructor(public platform: Platform) {
    this.splitPaneState = false;
  }

  spliPaneIsEnable() {
    let x = 2;
    if (x == 2) {
      this.splitPaneState = true;
    } else {
      this.splitPaneState = false;
    }

    return this.splitPaneState;
  }
}
