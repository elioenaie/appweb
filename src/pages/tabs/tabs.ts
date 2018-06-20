import { Component } from '@angular/core';

import { FavoritosPage } from '../favoritos/favoritos';
import { FavoprodPage } from '../favoprod/favoprod';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavoritosPage;
  tab2Root = FavoprodPage;

  constructor() {

  }
}
