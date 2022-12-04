import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'accueil',
        loadChildren: () => import('../accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'album',
        loadChildren: () => import('../album/album.module').then( m => m.AlbumPageModule)
      },
      {
        path: 'a-propos',
        loadChildren: () => import('../a-propos/a-propos.module').then( m => m.AProposPageModule)
      },
      {
        path: '',
        redirectTo: '/home/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
