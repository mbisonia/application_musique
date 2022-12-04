import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonTabs) tabs: any;
  selected = '';
  progress = 4;
  constructor() {}
  setSelectedTab()
  {
    console.log('CALLED');
    this.selected = this.tabs.getSelected();
  }

}
