import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedroomComponent } from './components/bedroom/bedroom.component';
import { GardenComponent } from './components/garden/garden.component';
import { HistoryComponent } from './components/history/history.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { LibraryComponent } from './components/library/library.component';
import { MainComponent } from './components/main/main.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'laboratorio',
    component: LaboratoryComponent,
  },
  {
    path: 'jardim',
    component: GardenComponent,
  },
  {
    path: 'biblioteca',
    component: LibraryComponent,
  },
  {
    path: 'historia',
    component: HistoryComponent,
  },
  {
    path: 'loja',
    component: ShopComponent,
  },
  {
    path: 'quarto',
    component: BedroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
